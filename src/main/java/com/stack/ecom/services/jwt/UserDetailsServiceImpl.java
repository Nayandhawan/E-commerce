package com.stack.ecom.services.jwt;

import com.stack.ecom.entity.User;
import com.stack.ecom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findFirstByEmail(username);
        if (optionalUser.isEmpty())
        {
            throw new UsernameNotFoundException("Username not found",null);
        }
        User user = optionalUser.get();

        // Convert UserRole to GrantedAuthority
        /*Spring Security Standard: The GrantedAuthority interface is used throughout Spring Security to represent roles and authorities.
        While String or enum can represent roles, Spring Security expects them to be wrapped in this interface to work with its various authorization checks (such as @PreAuthorize, hasRole(), etc.).*/

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" +user.getRole().name())
        );
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities  // Pass the authorities (roles)
        );
    }
}
