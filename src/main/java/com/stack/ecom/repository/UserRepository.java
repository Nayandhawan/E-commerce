package com.stack.ecom.repository;

import com.stack.ecom.entity.User;
import com.stack.ecom.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    User findByRole(UserRole userRole);

    List<User> findAllByRole(UserRole userRole);
}
