package com.stack.ecom.controller.customer;


import com.stack.ecom.dto.ProductDetailDto;
import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.entity.Product;
import com.stack.ecom.entity.StockSubscription;
import com.stack.ecom.entity.User;
import com.stack.ecom.repository.ProductImageRepository;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.StockSubscriptionRepository;
import com.stack.ecom.repository.UserRepository;
import com.stack.ecom.services.customer.CustomerProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerProductController {

    private final CustomerProductService customerProductService;
    private final StockSubscriptionRepository stockSubscriptionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductImageRepository productImageRepository;

    public CustomerProductController(CustomerProductService customerProductService,
                                     StockSubscriptionRepository stockSubscriptionRepository,
                                     ProductRepository productRepository,
                                     UserRepository userRepository,
                                     ProductImageRepository productImageRepository) {
        this.customerProductService = customerProductService;
        this.stockSubscriptionRepository = stockSubscriptionRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productImageRepository = productImageRepository;
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> productDtos = customerProductService.getAllProducts();
        return ResponseEntity.ok(productDtos) ;
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> getAllProductsByName(@RequestParam String name){
        List<ProductDto> productDtos = customerProductService.searchProductByTitle(name);
        return ResponseEntity.ok(productDtos) ;
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductDetailDto> getProductDetailById(@PathVariable Long productId){
        ProductDetailDto productDetailDto = customerProductService.getProductDetailById(productId);
        if (productDetailDto ==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(productDetailDto);
    }

    @GetMapping("/products/{productId}/related")
    public ResponseEntity<List<ProductDto>> getRelatedProducts(
            @PathVariable Long productId,
            @RequestParam String category) {
        return ResponseEntity.ok(customerProductService.getRelatedProducts(category, productId));
    }

    @GetMapping("/products/{productId}/images")
    public ResponseEntity<List<Map<String, Object>>> getProductImages(@PathVariable Long productId) {
        List<Map<String, Object>> images = productImageRepository.findByProductId(productId).stream()
            .map(img -> Map.<String, Object>of("id", img.getId(), "imgUrl", img.getImgPath()))
            .toList();
        return ResponseEntity.ok(images);
    }

    @GetMapping("/products/{productId}/notify/{userId}")
    public ResponseEntity<Map<String, Boolean>> checkSubscription(@PathVariable Long productId,
                                                                   @PathVariable Long userId) {
        boolean subscribed = stockSubscriptionRepository.existsByUserIdAndProductId(userId, productId);
        return ResponseEntity.ok(Map.of("subscribed", subscribed));
    }

    @PostMapping("/products/{productId}/notify/{userId}")
    public ResponseEntity<Void> subscribe(@PathVariable Long productId, @PathVariable Long userId) {
        if (stockSubscriptionRepository.existsByUserIdAndProductId(userId, productId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Optional<Product> product = productRepository.findById(productId);
        Optional<User> user = userRepository.findById(userId);
        if (product.isEmpty() || user.isEmpty()) return ResponseEntity.notFound().build();
        StockSubscription sub = new StockSubscription();
        sub.setProduct(product.get());
        sub.setUser(user.get());
        stockSubscriptionRepository.save(sub);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/products/{productId}/notify/{userId}")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long productId, @PathVariable Long userId) {
        if (!stockSubscriptionRepository.existsByUserIdAndProductId(userId, productId)) {
            return ResponseEntity.notFound().build();
        }
        stockSubscriptionRepository.deleteByUserIdAndProductId(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
