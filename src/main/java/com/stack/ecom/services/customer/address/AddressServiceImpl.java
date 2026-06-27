package com.stack.ecom.services.customer.address;

import com.stack.ecom.dto.SavedAddressDto;
import com.stack.ecom.entity.SavedAddress;
import com.stack.ecom.entity.User;
import com.stack.ecom.repository.SavedAddressRepository;
import com.stack.ecom.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    private final SavedAddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(SavedAddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public List<SavedAddressDto> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId).stream().map(this::toDto).toList();
    }

    public SavedAddressDto addAddress(Long userId, SavedAddressDto dto) {
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isEmpty()) return null;

        List<SavedAddress> existing = addressRepository.findByUserId(userId);
        boolean makeDefault = existing.isEmpty() || dto.isDefault();

        if (makeDefault) {
            existing.forEach(a -> { a.setDefault(false); addressRepository.save(a); });
        }

        SavedAddress addr = new SavedAddress();
        addr.setUser(optUser.get());
        addr.setLabel(dto.getLabel() != null ? dto.getLabel() : "Home");
        addr.setStreet(dto.getStreet());
        addr.setCity(dto.getCity());
        addr.setState(dto.getState());
        addr.setZipCode(dto.getZipCode());
        addr.setCountry(dto.getCountry());
        addr.setDefault(makeDefault);
        return toDto(addressRepository.save(addr));
    }

    @Transactional
    public boolean deleteAddress(Long addressId, Long userId) {
        Optional<SavedAddress> opt = addressRepository.findById(addressId);
        if (opt.isEmpty() || !opt.get().getUser().getId().equals(userId)) return false;
        boolean wasDefault = opt.get().isDefault();
        addressRepository.deleteById(addressId);
        if (wasDefault) {
            List<SavedAddress> remaining = addressRepository.findByUserId(userId);
            if (!remaining.isEmpty()) {
                remaining.get(0).setDefault(true);
                addressRepository.save(remaining.get(0));
            }
        }
        return true;
    }

    public SavedAddressDto setDefault(Long addressId, Long userId) {
        Optional<SavedAddress> opt = addressRepository.findById(addressId);
        if (opt.isEmpty() || !opt.get().getUser().getId().equals(userId)) return null;
        addressRepository.findByUserId(userId).forEach(a -> {
            a.setDefault(a.getId().equals(addressId));
            addressRepository.save(a);
        });
        return toDto(opt.get());
    }

    private SavedAddressDto toDto(SavedAddress a) {
        SavedAddressDto dto = new SavedAddressDto();
        dto.setId(a.getId());
        dto.setLabel(a.getLabel());
        dto.setStreet(a.getStreet());
        dto.setCity(a.getCity());
        dto.setState(a.getState());
        dto.setZipCode(a.getZipCode());
        dto.setCountry(a.getCountry());
        dto.setDefault(a.isDefault());
        return dto;
    }
}
