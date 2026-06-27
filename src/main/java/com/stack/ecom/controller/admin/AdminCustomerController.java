package com.stack.ecom.controller.admin;

import com.stack.ecom.dto.CustomerSummaryDto;
import com.stack.ecom.entity.User;
import com.stack.ecom.enums.OrderStatus;
import com.stack.ecom.enums.UserRole;
import com.stack.ecom.repository.OrderRepository;
import com.stack.ecom.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
public class AdminCustomerController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public AdminCustomerController(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<CustomerSummaryDto>> getAllCustomers() {
        List<CustomerSummaryDto> customers = userRepository.findAllByRole(UserRole.CUSTOMER)
            .stream()
            .map(this::toSummary)
            .toList();
        return ResponseEntity.ok(customers);
    }

    private CustomerSummaryDto toSummary(User user) {
        List<com.stack.ecom.entity.Order> orders = orderRepository.findByUserIdAndOrderStatusIn(
            user.getId(),
            List.of(OrderStatus.PLACED, OrderStatus.SHIPPED, OrderStatus.DELIVERED,
                    OrderStatus.RETURN_REQUESTED, OrderStatus.RETURNED)
        );
        long totalSpent = orders.stream()
            .filter(o -> o.getAmount() != null)
            .mapToLong(com.stack.ecom.entity.Order::getAmount)
            .sum();
        return new CustomerSummaryDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getCity(),
            orders.size(),
            totalSpent
        );
    }
}
