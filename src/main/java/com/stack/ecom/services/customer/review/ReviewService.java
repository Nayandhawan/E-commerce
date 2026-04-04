package com.stack.ecom.services.customer.review;

import com.stack.ecom.dto.OrderedProductResponseDto;
import com.stack.ecom.dto.ReviewDto;

import java.io.IOException;

public interface ReviewService {

    OrderedProductResponseDto getProductDetailsByOrderId(Long orderId);

    ReviewDto giveReview(ReviewDto reviewDto) throws IOException;
}
