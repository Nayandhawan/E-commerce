package com.stack.ecom.services.customer;

import com.stack.ecom.dto.ProductDetailDto;
import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.entity.FAQ;
import com.stack.ecom.entity.Product;
import com.stack.ecom.entity.Review;
import com.stack.ecom.repository.FAQRepository;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.ProductVariantRepository;
import com.stack.ecom.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerProductServiceImpl implements CustomerProductService{

    private final ProductRepository productRepository;
    private final FAQRepository faqRepository;
    private final ReviewRepository reviewRepository;
    private final ProductVariantRepository variantRepository;

    public CustomerProductServiceImpl(ProductRepository productRepository, FAQRepository faqRepository, ReviewRepository reviewRepository, ProductVariantRepository variantRepository) {
        this.productRepository = productRepository;
        this.faqRepository = faqRepository;
        this.reviewRepository = reviewRepository;
        this.variantRepository = variantRepository;
    }

    public List<ProductDto> getAllProducts(){
        Map<Long, Double> ratingMap = buildRatingMap();
        return productRepository.findAllWithCategory().stream()
            .map(p -> enrichDto(p.getDto(), ratingMap))
            .collect(Collectors.toList());
    }

    public List<ProductDto> searchProductByTitle(String name){
        Map<Long, Double> ratingMap = buildRatingMap();
        return productRepository.findAllByNameContainingWithCategory(name).stream()
            .map(p -> enrichDto(p.getDto(), ratingMap))
            .collect(Collectors.toList());
    }

    public ProductDetailDto getProductDetailById(Long productId){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()){
            List<FAQ> faqList = faqRepository.findAllByProductId(productId);
            List<Review> reviewList = reviewRepository.findAllByProductId(productId);

            ProductDetailDto productDetailDto = new ProductDetailDto();

            Map<Long, Double> ratingMap = buildRatingMap();
            productDetailDto.setProductDto(enrichDto(optionalProduct.get().getDto(), ratingMap));
            productDetailDto.setFaqDtoList(faqList.stream().map(FAQ::getFAQDto).collect(Collectors.toList()));
            productDetailDto.setReviewDtoList(reviewList.stream().map(Review::getDto).collect(Collectors.toList()));
            productDetailDto.setVariantList(variantRepository.findAllByProductId(productId)
                    .stream().map(v -> v.toDto()).collect(Collectors.toList()));

            return productDetailDto;
        }
        return null;
    }

    public List<ProductDto> getRelatedProducts(String categoryName, Long excludeId) {
        Map<Long, Double> ratingMap = buildRatingMap();
        return productRepository.findByCategoryNameIgnoreCaseAndIdNot(categoryName, excludeId)
            .stream()
            .limit(8)
            .map(p -> enrichDto(p.getDto(), ratingMap))
            .collect(Collectors.toList());
    }

    private Map<Long, Double> buildRatingMap() {
        Map<Long, Double> map = new HashMap<>();
        for (Object[] row : reviewRepository.findAverageRatingsPerProduct()) {
            map.put((Long) row[0], (Double) row[1]);
        }
        return map;
    }

    private ProductDto enrichDto(ProductDto dto, Map<Long, Double> ratingMap) {
        dto.setAverageRating(ratingMap.get(dto.getId()));
        return dto;
    }
}
