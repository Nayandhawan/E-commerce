package com.stack.ecom.services.auth;

import com.stack.ecom.dto.SignupRequest;
import com.stack.ecom.dto.UserDto;

public interface AuthService    {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
