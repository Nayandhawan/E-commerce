package com.stack.product.service;

import com.stack.product.dto.ReviewDto;
import com.stack.product.entity.Review;
import com.stack.product.repository.ProductRepository;
import com.stack.product.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public ReviewDto addReview(ReviewDto dto) {
        Review review = new Review();
        review.setRating(dto.getRating());
        review.setDescription(dto.getDescription());
        review.setUserId(dto.getUserId());
        review.setProduct(productRepository.findById(dto.getProductId()).orElseThrow());
        return toDto(reviewRepository.save(review));
    }

    public List<ReviewDto> getReviewsByProduct(Long productId) {
        return reviewRepository.findAllByProductId(productId).stream().map(this::toDto).toList();
    }

    private ReviewDto toDto(Review r) {
        ReviewDto dto = new ReviewDto();
        dto.setId(r.getId());
        dto.setRating(r.getRating());
        dto.setDescription(r.getDescription());
        dto.setUserId(r.getUserId());
        dto.setProductId(r.getProduct().getId());
        return dto;
    }
}
