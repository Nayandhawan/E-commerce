package com.stack.ecom.services.customer.profile;

import com.stack.ecom.dto.ProfileDto;
import com.stack.ecom.entity.User;
import com.stack.ecom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerProfileServiceImpl implements CustomerProfileService {

    private final UserRepository userRepository;

    public CustomerProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ProfileDto getProfile(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) return null;
        return toDto(optionalUser.get());
    }

    @Override
    public ProfileDto updateProfile(Long userId, ProfileDto dto) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();

        if (dto.getName() != null)    user.setName(dto.getName());
        if (dto.getEmail() != null)   user.setEmail(dto.getEmail());
        if (dto.getPhone() != null)   user.setPhone(dto.getPhone());
        if (dto.getStreet() != null)  user.setStreet(dto.getStreet());
        if (dto.getCity() != null)    user.setCity(dto.getCity());
        if (dto.getState() != null)   user.setState(dto.getState());
        if (dto.getZipCode() != null) user.setZipCode(dto.getZipCode());
        if (dto.getCountry() != null) user.setCountry(dto.getCountry());

        return toDto(userRepository.save(user));
    }

    private ProfileDto toDto(User user) {
        ProfileDto dto = new ProfileDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setStreet(user.getStreet());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setZipCode(user.getZipCode());
        dto.setCountry(user.getCountry());
        return dto;
    }
}
