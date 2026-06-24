package com.stack.ecom.services.auth;

import com.stack.ecom.dto.SignupRequest;
import com.stack.ecom.dto.UserDto;
import com.stack.ecom.entity.Order;
import com.stack.ecom.entity.User;
import com.stack.ecom.enums.OrderStatus;
import com.stack.ecom.enums.UserRole;
import com.stack.ecom.repository.OrderRepository;
import com.stack.ecom.repository.UserRepository;
import com.stack.ecom.utils.OtpStore;
import jakarta.annotation.PostConstruct;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OrderRepository orderRepository;
    private final OtpStore otpStore;
    private final JavaMailSender mailSender;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           OrderRepository orderRepository,
                           OtpStore otpStore,
                           JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.orderRepository = orderRepository;
        this.otpStore = otpStore;
        this.mailSender = mailSender;
    }

    @Override
    public UserDto createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole(UserRole.CUSTOMER);
        User createdUser = userRepository.save(user);

        Order order = new Order();
        order.setAmount(0L);
        order.setTotalAmount(0L);
        order.setDiscount(0L);
        order.setUser(createdUser);
        order.setOrderStatus(OrderStatus.PENDING);
        orderRepository.save(order);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        return userDto;
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public void sendPasswordResetOtp(String email) {
        Optional<User> optionalUser = userRepository.findFirstByEmail(email.toLowerCase());
        if (optionalUser.isEmpty()) return; // silently ignore unknown emails
        String otp = otpStore.generateAndStore(email);
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, false, "UTF-8");
            helper.setTo(email);
            helper.setSubject("ShopKart — Password Reset OTP");
            helper.setText(
                "<div style='font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:8px'>"
                + "<h2 style='color:#ff9900;margin:0 0 8px'>ShopKart</h2>"
                + "<p style='color:#333;margin:0 0 16px'>You requested a password reset. Use the OTP below — it expires in <strong>10 minutes</strong>.</p>"
                + "<div style='background:#f5f5f5;border-radius:8px;padding:20px;text-align:center;font-size:32px;font-weight:800;letter-spacing:10px;color:#111'>" + otp + "</div>"
                + "<p style='color:#999;font-size:12px;margin:16px 0 0'>If you didn't request this, ignore this email.</p>"
                + "</div>", true);
            mailSender.send(msg);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        return otpStore.verify(email, otp);
    }

    @Override
    public boolean resetPassword(String email, String otp, String newPassword) {
        if (!otpStore.verify(email, otp)) return false;
        Optional<User> optionalUser = userRepository.findFirstByEmail(email.toLowerCase());
        if (optionalUser.isEmpty()) return false;
        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpStore.remove(email);
        return true;
    }

    @PostConstruct
    public void createAdminAccount() {
        User adminAccount = userRepository.findByRole(UserRole.ADMIN);
        if (adminAccount == null) {
            User user = new User();
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(passwordEncoder.encode("admin"));
            userRepository.save(user);
        }
    }
}
