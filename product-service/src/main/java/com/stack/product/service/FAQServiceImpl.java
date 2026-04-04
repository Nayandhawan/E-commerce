package com.stack.product.service;

import com.stack.product.dto.FAQDto;
import com.stack.product.entity.FAQ;
import com.stack.product.repository.FAQRepository;
import com.stack.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FAQServiceImpl {

    private final FAQRepository faqRepository;
    private final ProductRepository productRepository;

    public FAQServiceImpl(FAQRepository faqRepository, ProductRepository productRepository) {
        this.faqRepository = faqRepository;
        this.productRepository = productRepository;
    }

    public FAQDto addFaq(FAQDto dto) {
        FAQ faq = new FAQ();
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        faq.setProduct(productRepository.findById(dto.getProductId()).orElseThrow());
        FAQ saved = faqRepository.save(faq);
        return toDto(saved);
    }

    public List<FAQDto> getFaqsByProduct(Long productId) {
        return faqRepository.findAllByProductId(productId).stream().map(this::toDto).toList();
    }

    private FAQDto toDto(FAQ f) {
        FAQDto dto = new FAQDto();
        dto.setId(f.getId());
        dto.setQuestion(f.getQuestion());
        dto.setAnswer(f.getAnswer());
        dto.setProductId(f.getProduct().getId());
        return dto;
    }
}
