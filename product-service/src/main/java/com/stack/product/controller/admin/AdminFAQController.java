package com.stack.product.controller.admin;

import com.stack.product.dto.FAQDto;
import com.stack.product.service.FAQServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/faq")
public class AdminFAQController {

    private final FAQServiceImpl faqService;

    public AdminFAQController(FAQServiceImpl faqService) {
        this.faqService = faqService;
    }

    @PostMapping
    public ResponseEntity<FAQDto> addFaq(@RequestBody FAQDto dto) {
        return ResponseEntity.ok(faqService.addFaq(dto));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<FAQDto>> getFaqs(@PathVariable Long productId) {
        return ResponseEntity.ok(faqService.getFaqsByProduct(productId));
    }
}
