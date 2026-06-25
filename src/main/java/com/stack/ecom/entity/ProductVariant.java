package com.stack.ecom.entity;

import com.stack.ecom.dto.ProductVariantDto;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    private String size;
    private String colour;
    private Long stockQuantity = 0L;

    public Long getId() { return id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }
    public Long getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Long stockQuantity) { this.stockQuantity = stockQuantity; }

    public ProductVariantDto toDto() {
        ProductVariantDto dto = new ProductVariantDto();
        dto.setId(id);
        dto.setProductId(product.getId());
        dto.setSize(size);
        dto.setColour(colour);
        dto.setStockQuantity(stockQuantity);
        return dto;
    }
}
