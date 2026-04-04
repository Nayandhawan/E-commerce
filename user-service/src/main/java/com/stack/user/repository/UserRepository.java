package com.stack.user.repository;

import com.stack.user.entity.User;
import com.stack.user.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String email);
    User findByRole(UserRole role);
}
