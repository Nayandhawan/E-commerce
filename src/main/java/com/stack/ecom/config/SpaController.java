package com.stack.ecom.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Forwards all non-API routes to index.html so Angular's client-side
 * router handles navigation (SPA fallback).
 */
@Controller
public class SpaController {

    @RequestMapping(value = {
        "/",
        "/login",
        "/signup",
        "/admin/**",
        "/customer/**",
        "/track-order/**"
    })
    public String spa() {
        return "forward:/index.html";
    }
}
