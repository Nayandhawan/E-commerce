package com.stack.ecom.dto;

public class LoginResponse {

    private Long userId;
    private String role;
    private String token;
    private String name;
    private String email;

    public LoginResponse(Long userId, String role, String token, String name, String email) {
        this.userId = userId;
        this.role = role;
        this.token = token;
        this.name = name;
        this.email = email;
    }

    public Long getUserId() { return userId; }
    public String getRole() { return role; }
    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
