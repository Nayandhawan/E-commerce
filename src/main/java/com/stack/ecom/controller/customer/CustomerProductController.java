package com.stack.ecom.controller.customer;


import com.stack.ecom.dto.ProductDetailDto;
import com.stack.ecom.dto.ProductDto;
import com.stack.ecom.services.customer.CustomerProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerProductController {

    private final CustomerProductService customerProductService;

    public CustomerProductController(CustomerProductService customerProductService){
        this.customerProductService = customerProductService;
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
}
