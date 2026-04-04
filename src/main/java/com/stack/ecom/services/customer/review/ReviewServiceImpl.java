package com.stack.ecom.services.customer.review;

import com.stack.ecom.dto.OrderedProductResponseDto;
import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.dto.ReviewDto;
import com.stack.ecom.entity.*;
import com.stack.ecom.repository.OrderRepository;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.ReviewRepository;
import com.stack.ecom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService{

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final ReviewRepository reviewrepository;

    public ReviewServiceImpl(OrderRepository orderRepository,ProductRepository productRepository,UserRepository userRepository,ReviewRepository reviewrepository){
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reviewrepository = reviewrepository;
    }

    public OrderedProductResponseDto getProductDetailsByOrderId(Long orderId){
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        OrderedProductResponseDto orderedProductResponseDto = new OrderedProductResponseDto();
        if (optionalOrder.isPresent()){
            orderedProductResponseDto.setOrderAmount(optionalOrder.get().getAmount());
            List<ProductDto> productDtoList = new ArrayList<>();
            for (CartItems cartItems: optionalOrder.get().getCartItems()){
                ProductDto productDto = new ProductDto();
                productDto.setId(cartItems.getProduct().getId());
                productDto.setName(cartItems.getProduct().getName());
                productDto.setPrice(cartItems.getPrice());
                productDto.setQuantity(cartItems.getQuantity());
                productDto.setByteImg(cartItems.getProduct().getImg());
                productDtoList.add(productDto);
            }
            orderedProductResponseDto.setProductDtoList(productDtoList);
        }
        return orderedProductResponseDto;
    }

    public ReviewDto giveReview(ReviewDto reviewDto) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(reviewDto.getProductId());
        Optional<User> optionalUser = userRepository.findById(reviewDto.getUserId());
        if (optionalProduct.isPresent() && optionalUser.isPresent()){
            Review review = new Review();
            review.setRating(reviewDto.getRating());
            review.setDescription(reviewDto.getDescription());
            review.setUser(optionalUser.get());
            review.setProduct(optionalProduct.get());
            review.setImg(reviewDto.getImg().getBytes());
            return reviewrepository.save(review).getDto();
        }
        return null;
    }
}


