package com.stack.ecom.dto;

public class ProductVariantDto {
    private Long id;
    private Long productId;
    private String size;
    private String colour;
    private Long stockQuantity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }
    public Long getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Long stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getLabel() {
        if (size != null && colour != null) return size + " / " + colour;
        if (size != null) return size;
        if (colour != null) return colour;
        return "";
    }
}
