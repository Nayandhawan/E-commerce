package com.stack.ecom.controller.admin;

import com.stack.ecom.entity.Product;
import com.stack.ecom.entity.Review;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.ReviewRepository;
import com.stack.ecom.services.storage.ImageStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class ImageMigrationController {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final ImageStorageService imageStorageService;

    public ImageMigrationController(ProductRepository productRepository,
                                    ReviewRepository reviewRepository,
                                    ImageStorageService imageStorageService) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.imageStorageService = imageStorageService;
    }

    @PostMapping("/migrate-images")
    public ResponseEntity<Map<String, Object>> migrateImages() {
        int products = 0, reviews = 0, errors = 0;

        List<Product> allProducts = productRepository.findAll();
        for (Product p : allProducts) {
            if (p.getImg() != null && p.getImgPath() == null) {
                try {
                    String path = imageStorageService.save(p.getImg(), "products", p.getId() + ".jpg");
                    p.setImgPath(path);
                    p.setImg(null);
                    productRepository.save(p);
                    products++;
                } catch (Exception e) {
                    errors++;
                }
            }
        }

        List<Review> allReviews = reviewRepository.findAll();
        for (Review r : allReviews) {
            if (r.getImg() != null && r.getImgPath() == null) {
                try {
                    String path = imageStorageService.save(r.getImg(), "reviews", r.getId() + ".jpg");
                    r.setImgPath(path);
                    r.setImg(null);
                    reviewRepository.save(r);
                    reviews++;
                } catch (Exception e) {
                    errors++;
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("products", products);
        result.put("reviews", reviews);
        result.put("errors", errors);
        return ResponseEntity.ok(result);
    }
}
