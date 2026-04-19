package com.stack.ecom.services.customer.profile;

import com.stack.ecom.dto.ProfileDto;

public interface CustomerProfileService {

    ProfileDto getProfile(Long userId);

    ProfileDto updateProfile(Long userId, ProfileDto dto);
}
