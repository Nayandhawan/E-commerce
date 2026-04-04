package com.stack.user.dto;

import com.stack.user.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
}
