package com.stack.ecom.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SavedAddressDto {

    private Long id;

    @Size(max = 50, message = "Label must be under 50 characters")
    private String label;

    @NotBlank(message = "Street is required")
    @Size(max = 200, message = "Street must be under 200 characters")
    private String street;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City must be under 100 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State must be under 100 characters")
    private String state;

    @NotBlank(message = "Zip code is required")
    @Size(max = 20, message = "Zip code must be under 20 characters")
    private String zipCode;

    @Size(max = 100, message = "Country must be under 100 characters")
    private String country;

    private boolean isDefault;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }
}
