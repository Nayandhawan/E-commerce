package com.stack.ecom.services.customer.address;

import com.stack.ecom.dto.SavedAddressDto;

import java.util.List;

public interface AddressService {
    List<SavedAddressDto> getAddresses(Long userId);
    SavedAddressDto addAddress(Long userId, SavedAddressDto dto);
    boolean deleteAddress(Long addressId, Long userId);
    SavedAddressDto setDefault(Long addressId, Long userId);
}
