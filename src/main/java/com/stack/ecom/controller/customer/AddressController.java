package com.stack.ecom.controller.customer;

import com.stack.ecom.dto.SavedAddressDto;
import com.stack.ecom.services.customer.address.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<SavedAddressDto>> getAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddresses(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<SavedAddressDto> addAddress(@PathVariable Long userId,
                                                       @RequestBody SavedAddressDto dto) {
        SavedAddressDto saved = addressService.addAddress(userId, dto);
        if (saved == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{userId}/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        boolean deleted = addressService.deleteAddress(addressId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{userId}/{addressId}/default")
    public ResponseEntity<SavedAddressDto> setDefault(@PathVariable Long userId, @PathVariable Long addressId) {
        SavedAddressDto dto = addressService.setDefault(addressId, userId);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }
}
