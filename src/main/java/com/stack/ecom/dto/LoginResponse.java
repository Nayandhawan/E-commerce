package com.stack.ecom.dto;

public class LoginResponse {

    private Long userId;
    private String role;
    private String token;

    public LoginResponse(Long userId, String role, String token) {
        this.userId = userId;
        this.role = role;
        this.token = token;
    }

    public Long getUserId() { return userId; }
    public String getRole() { return role; }
    public String getToken() { return token; }
}
