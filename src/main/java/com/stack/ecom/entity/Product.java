package com.stack.ecom.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stack.ecom.dto.ProductDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(name = "product", indexes = {
    @Index(name = "idx_product_name", columnList = "name"),
    @Index(name = "idx_product_stock", columnList = "stock_quantity")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Basic(fetch = FetchType.LAZY)
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    private String imgPath;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Category category;

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 100")
    private Long stockQuantity = 100L;

    public String getImgPath() { return imgPath; }
    public void setImgPath(String imgPath) { this.imgPath = imgPath; }

    public ProductDto getDto(){
        ProductDto productDto = new ProductDto();
        productDto.setId(id);
        productDto.setName(name);
        if (imgPath != null) {
            productDto.setImgUrl(imgPath);
        } else {
            productDto.setByteImg(img);
        }
        productDto.setDescription(description);
        productDto.setPrice(price);
        productDto.setCategoryId(category.getId());
        productDto.setCategoryName(category.getName());
        productDto.setStockQuantity(stockQuantity != null ? stockQuantity : 100L);
        return productDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Long stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
