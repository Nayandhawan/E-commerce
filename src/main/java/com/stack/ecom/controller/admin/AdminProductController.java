package com.stack.ecom.controller.admin;

import com.stack.ecom.dto.FAQDto;
import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.dto.ProductVariantDto;
import com.stack.ecom.entity.Product;
import com.stack.ecom.entity.ProductVariant;
import com.stack.ecom.repository.ProductRepository;
import com.stack.ecom.repository.ProductVariantRepository;
import com.stack.ecom.services.admin.FAQ.FAQService;
import com.stack.ecom.services.admin.adminproduct.AdminProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminProductController {

    private final AdminProductService adminProductService;
    private final FAQService faqService;
    private final ProductVariantRepository variantRepository;
    private final ProductRepository productRepository;

    public AdminProductController(AdminProductService adminProductService, FAQService faqService,
                                  ProductVariantRepository variantRepository, ProductRepository productRepository) {
        this.adminProductService = adminProductService;
        this.faqService = faqService;
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDto> addProduct(@ModelAttribute ProductDto productDto) throws IOException {
        ProductDto productDto1 =  adminProductService.addProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDto1);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> productDtos = adminProductService.getAllProducts();
        return ResponseEntity.ok(productDtos) ;
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDto>> getAllProductsByName(@RequestParam String name){
        List<ProductDto> productDtos = adminProductService.getAllProductsByName(name);
        return ResponseEntity.ok(productDtos) ;
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId){
        boolean deleted = adminProductService.deleteProductById(productId);
        if (deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/faq")
    public ResponseEntity<FAQDto> postFAQ(@RequestBody FAQDto faqDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(faqService.postFAQ(faqDto.getProductId(), faqDto));
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId){
        ProductDto productDto = adminProductService.getProductById(productId);
        if (productDto !=null){
            return ResponseEntity.ok(productDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId,@ModelAttribute ProductDto productDto) throws IOException {
        ProductDto updateProduct = adminProductService.updateProduct(productId,productDto);
        if (updateProduct !=null){
            return ResponseEntity.ok(updateProduct);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products/{productId}/variants")
    public ResponseEntity<List<ProductVariantDto>> getVariants(@PathVariable Long productId) {
        return ResponseEntity.ok(variantRepository.findAllByProductId(productId)
                .stream().map(ProductVariant::toDto).toList());
    }

    @PostMapping("/products/{productId}/variants")
    public ResponseEntity<ProductVariantDto> addVariant(@PathVariable Long productId,
                                                         @RequestBody ProductVariantDto dto) {
        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) return ResponseEntity.notFound().build();
        ProductVariant v = new ProductVariant();
        v.setProduct(optProduct.get());
        v.setSize(dto.getSize());
        v.setColour(dto.getColour());
        v.setStockQuantity(dto.getStockQuantity() != null ? dto.getStockQuantity() : 0L);
        return ResponseEntity.status(HttpStatus.CREATED).body(variantRepository.save(v).toDto());
    }

    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<Void> deleteVariant(@PathVariable Long variantId) {
        if (!variantRepository.existsById(variantId)) return ResponseEntity.notFound().build();
        variantRepository.deleteById(variantId);
        return ResponseEntity.noContent().build();
    }

}
