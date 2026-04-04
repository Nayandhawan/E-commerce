package com.stack.user.service;

import com.stack.user.dto.SignupRequest;
import com.stack.user.dto.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest request);
    boolean hasUserWithEmail(String email);
}
