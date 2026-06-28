package com.stack.ecom.services.customer.cart;

import com.stack.ecom.dto.AddProductInCartDto;
import com.stack.ecom.dto.CartItemsDto;
import com.stack.ecom.dto.OrderDto;
import com.stack.ecom.dto.PlaceOrderDto;
import com.stack.ecom.entity.*;
import com.stack.ecom.enums.OrderStatus;
import com.stack.ecom.exceptions.ValidationException;
import com.stack.ecom.repository.*;
import com.stack.ecom.services.email.EmailService;
import com.stack.ecom.services.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;

    /*public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(addProductInCartDto.getProductId(),activeOrder.getId(),addProductInCartDto.getUserId());

        if (optionalCartItems.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }else {
            Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
            Optional<User> optionalUser = userRepository.findById(addProductInCartDto.getUserId());

            if (optionalProduct.isPresent() && optionalUser.isPresent()){
                CartItems cartItems = new CartItems();
                cartItems.setProduct(optionalProduct.get());
                cartItems.setPrice(optionalProduct.get().getPrice());
                cartItems.setQuantity(1L);
                cartItems.setUser(optionalUser.get());
                cartItems.setOrder(activeOrder);

                CartItems updateCart = cartItemsRepository.save(cartItems);

                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cartItems.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + cartItems.getPrice());
                activeOrder.getCartItems().add(cartItems);
                orderRepository.save(activeOrder);

                return ResponseEntity.status(HttpStatus.CREATED).body(cartItems);

            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product Not Found");
            }
        }

    }*/

    @Transactional
    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        // Retrieve any existing order with PENDING status for the user
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(
                addProductInCartDto.getUserId(), OrderStatus.PENDING);

        // If no pending order exists, create a new one
        if (activeOrder == null) {
            Optional<User> optionalUser = userRepository.findById(addProductInCartDto.getUserId());
            if (optionalUser.isPresent()) {
                activeOrder = new Order();
                activeOrder.setUser(optionalUser.get());
                activeOrder.setOrderStatus(OrderStatus.PENDING);
                activeOrder.setTotalAmount(0L);
                activeOrder.setAmount(0L);
                activeOrder = orderRepository.save(activeOrder);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        }

        // Check if the product is already in the cart for the active order
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), addProductInCartDto.getUserId());

        if (optionalCartItems.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists in the cart.");
        } else {
            // Find the product
            Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

            if (optionalProduct.isPresent()) {
                // Create a new cart item
                CartItems cartItems = new CartItems();
                cartItems.setProduct(optionalProduct.get());
                cartItems.setPrice(optionalProduct.get().getPrice());
                cartItems.setQuantity(1L);
                cartItems.setUser(activeOrder.getUser());
                cartItems.setOrder(activeOrder);

                // Save the cart item and update the order's total amount
                CartItems updatedCart = cartItemsRepository.save(cartItems);
                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cartItems.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + cartItems.getPrice());
                orderRepository.save(activeOrder);

                return ResponseEntity.status(HttpStatus.CREATED).body(updatedCart.cartItemsDto());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Found");
            }
        }
    }


    public OrderDto getCartByUserId(Long userId){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        if (activeOrder == null) {
            OrderDto empty = new OrderDto();
            empty.setCartItems(Collections.emptyList());
            return empty;
        }
        List<CartItemsDto> cartItemsDtoList = activeOrder.getCartItems() != null
                ? activeOrder.getCartItems().stream().map(CartItems::cartItemsDto).toList()
                : Collections.emptyList();
        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setDiscount(activeOrder.getDiscount());
        orderDto.setTotalAmount(activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);
        if (activeOrder.getCoupon() !=null){
            orderDto.setCouponName(activeOrder.getCoupon().getName());
        }
        return orderDto;
    }

    public OrderDto applyCoupon(Long userId,String code){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        Coupon coupon = couponRepository.findByCode(code).orElseThrow(() ->new ValidationException("Coupon not found"));
        if (couponIsExpired(coupon)){
            throw new ValidationException("Coupon has Expired");
        }

        double discountAmount = ((coupon.getDiscount()/100.0 ) * activeOrder.getTotalAmount());
        double netAmount = activeOrder.getAmount() - discountAmount;

        activeOrder.setAmount((long)netAmount);
        activeOrder.setDiscount((long)discountAmount);
        activeOrder.setCoupon(coupon);
        orderRepository.save(activeOrder);

        return activeOrder.getOrderDto();
    }

    private String buildAddress(PlaceOrderDto dto) {
        return String.join(", ",
            nullSafe(dto.getStreet()), nullSafe(dto.getCity()),
            nullSafe(dto.getState()), nullSafe(dto.getZipCode()),
            nullSafe(dto.getCountry())).replaceAll("(, )+", ", ").strip();
    }

    private String nullSafe(String s) { return s != null ? s : ""; }

    private boolean couponIsExpired(Coupon coupon){
        Date currentDate = new Date();
        Date expirationDate = coupon.getExpirationDate();

        return expirationDate !=null && currentDate.after(expirationDate);
    }

    public OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(addProductInCartDto.getProductId(), activeOrder.getId(),addProductInCartDto.getUserId());

        if (optionalProduct.isPresent() && optionalCartItems.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            // Ensure the product has a valid price
            if (product.getPrice() == null) {
                throw new IllegalArgumentException("Product price is missing.");
            }
            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());

            cartItems.setQuantity(cartItems.getQuantity()+1);
            if (activeOrder.getCoupon() != null){
                double discountAmount = ((activeOrder.getCoupon().getDiscount()/100.0 ) * activeOrder.getTotalAmount());
                double netAmount = activeOrder.getAmount() - discountAmount;

                activeOrder.setAmount((long)netAmount);
                activeOrder.setDiscount((long)discountAmount);
            }
            cartItemsRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductInCartDto.getUserId(), OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(addProductInCartDto.getProductId(), activeOrder.getId(),addProductInCartDto.getUserId());

        if (optionalProduct.isPresent() && optionalCartItems.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            // Ensure the product has a valid price
            if (product.getPrice() == null) {
                throw new IllegalArgumentException("Product price is missing.");
            }
            activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());

            cartItems.setQuantity(cartItems.getQuantity()-1);
            if (activeOrder.getCoupon() != null){
                double discountAmount = ((activeOrder.getCoupon().getDiscount()/100.0 ) * activeOrder.getTotalAmount());
                double netAmount = activeOrder.getTotalAmount() - discountAmount;

                activeOrder.setAmount((long)netAmount);
                activeOrder.setDiscount((long)discountAmount);
            }
            cartItemsRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto placeOrder(PlaceOrderDto placeOrderDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDto.getUserId(), OrderStatus.PENDING);
        Optional<User> optionalUser = userRepository.findById(placeOrderDto.getUserId());
        if (optionalUser.isPresent()){
            activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());
            activeOrder.setDeliveryStreet(placeOrderDto.getStreet());
            activeOrder.setDeliveryCity(placeOrderDto.getCity());
            activeOrder.setDeliveryState(placeOrderDto.getState());
            activeOrder.setDeliveryZipCode(placeOrderDto.getZipCode());
            activeOrder.setDeliveryCountry(placeOrderDto.getCountry());
            String addr = placeOrderDto.getAddress() != null ? placeOrderDto.getAddress()
                : buildAddress(placeOrderDto);
            activeOrder.setAddress(addr);
            activeOrder.setDate(new Date());
            activeOrder.setOrderStatus(OrderStatus.PLACED);
            activeOrder.setTrackingId(UUID.randomUUID());
            orderRepository.save(activeOrder);

            // Decrement stock for each product in the order
            if (activeOrder.getCartItems() != null) {
                for (CartItems item : activeOrder.getCartItems()) {
                    Product product = item.getProduct();
                    long newStock = Math.max(0, product.getStockQuantity() - item.getQuantity());
                    product.setStockQuantity(newStock);
                    productRepository.save(product);
                }
            }

            notificationService.create(placeOrderDto.getUserId(), "Your order has been placed successfully!");
            User user = optionalUser.get();
            emailService.sendOrderConfirmation(user.getEmail(), user.getName(), activeOrder);

            Order order =new Order();
            order.setAmount(0L);
            order.setTotalAmount(0L);
            order.setDiscount(0L);
            order.setUser(optionalUser.get());
            order.setOrderStatus(OrderStatus.PENDING);
            orderRepository.save(order);

            return activeOrder.getOrderDto();

        }
        return null;
    }

    public List<OrderDto> getPlacedOrder(Long userId){
        return orderRepository.findByUserIdAndOrderStatusIn(userId, List.of(
                OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED,
                OrderStatus.CANCELLED, OrderStatus.RETURN_REQUESTED, OrderStatus.RETURNED))
            .stream().map(Order::getOrderDto).collect(Collectors.toList());
    }

    public OrderDto searchOrderByTrackingId(UUID trackingId){
        Optional<Order> optionalOrder = orderRepository.findByTrackingId(trackingId);
        return optionalOrder.map(Order::getOrderDto).orElse(null);
    }

    public ResponseEntity<?> cancelOrder(Long userId, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findByIdAndUserId(orderId, userId);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
        Order order = optionalOrder.get();
        if (order.getOrderStatus() == OrderStatus.SHIPPED || order.getOrderStatus() == OrderStatus.DELIVERED) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order cannot be cancelled after it has been shipped");
        }
        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order is already cancelled");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        notificationService.create(userId, "Your order #" + orderId + " has been cancelled.");
        return ResponseEntity.ok(order.getOrderDto());
    }

    public ResponseEntity<?> requestReturn(Long userId, Long orderId, String reason) {
        Optional<Order> optionalOrder = orderRepository.findByIdAndUserId(orderId, userId);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
        Order order = optionalOrder.get();
        if (order.getOrderStatus() != OrderStatus.DELIVERED) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only delivered orders can be returned");
        }
        order.setOrderStatus(OrderStatus.RETURN_REQUESTED);
        order.setReturnReason(reason);
        orderRepository.save(order);
        notificationService.create(userId, "Your return request for order #" + orderId + " has been submitted.");
        return ResponseEntity.ok(order.getOrderDto());
    }

    public OrderDto removeFromCart(Long userId, Long productId) {
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                productId, activeOrder.getId(), userId);

        if (optionalCartItems.isPresent()) {
            CartItems cartItem = optionalCartItems.get();
            long itemTotal = cartItem.getPrice() * cartItem.getQuantity();

            activeOrder.setTotalAmount(activeOrder.getTotalAmount() - itemTotal);
            activeOrder.setAmount(activeOrder.getAmount() - itemTotal);

            if (activeOrder.getCoupon() != null) {
                double discountAmount = (activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount();
                activeOrder.setAmount((long) (activeOrder.getTotalAmount() - discountAmount));
                activeOrder.setDiscount((long) discountAmount);
            }

            activeOrder.getCartItems().remove(cartItem);
            cartItemsRepository.delete(cartItem);
            orderRepository.save(activeOrder);
        }

        return activeOrder.getOrderDto();
    }

}
