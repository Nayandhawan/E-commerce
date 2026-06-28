package com.stack.ecom.services.email;

import com.stack.ecom.entity.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Async
    public void sendShippingNotification(String toEmail, String customerName, Order order) {
        if (mailSender == null || toEmail == null || toEmail.isBlank()) return;
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Your order #" + order.getId() + " has been shipped! — ShopKart");
            helper.setText(buildShippingHtml(customerName, order), true);
            mailSender.send(msg);
        } catch (MessagingException | RuntimeException e) {
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String buildShippingHtml(String name, Order order) {
        String tracking = order.getTrackingId() != null ? order.getTrackingId().toString() : "—";
        String address = order.getAddress() != null ? order.getAddress() : "—";

        return """
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5">
              <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
                <div style="background:#131921;padding:24px 32px">
                  <span style="font-size:22px;font-weight:800;color:#fff">Shop<em style="font-style:italic;color:#FF9900">Kart</em></span>
                </div>
                <div style="padding:32px">
                  <h2 style="margin:0 0 4px;font-size:20px;color:#111">Your order is on its way!</h2>
                  <p style="margin:0 0 24px;color:#555;font-size:14px">Hi %s, great news — your order has been shipped and is heading to you.</p>
                  <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin-bottom:24px">
                    <table style="width:100%%;border-collapse:collapse;font-size:13px">
                      <tr><td style="color:#777;padding:5px 0">Order ID</td><td style="text-align:right;font-weight:700;color:#111">#%s</td></tr>
                      <tr><td style="color:#777;padding:5px 0">Tracking ID</td><td style="text-align:right;color:#111;font-size:11px;font-family:monospace">%s</td></tr>
                      <tr><td style="color:#777;padding:5px 0">Delivering To</td><td style="text-align:right;color:#111">%s</td></tr>
                    </table>
                  </div>
                  <p style="font-size:13px;color:#777;margin:0">Track your order status on the <strong>My Orders</strong> page.</p>
                </div>
                <div style="background:#f5f5f5;padding:16px 32px;text-align:center;font-size:11px;color:#aaa;border-top:1px solid #e5e5e5">
                  © 2025 ShopKart. All rights reserved.
                </div>
              </div>
            </body>
            </html>
            """.formatted(name, order.getId(), tracking, address);
    }

    @Async
    public void sendOrderConfirmation(String toEmail, String customerName, Order order) {
        if (mailSender == null || toEmail == null || toEmail.isBlank()) return;
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Order Confirmed! #" + order.getId() + " — ShopKart");
            helper.setText(buildHtml(customerName, order), true);
            mailSender.send(msg);
        } catch (MessagingException | RuntimeException e) {
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }

    private String buildHtml(String name, Order order) {
        String date = order.getDate() != null
            ? new SimpleDateFormat("dd MMM yyyy").format(order.getDate()) : "—";
        String amount = "₹" + NumberFormat.getNumberInstance(new Locale("en", "IN")).format(order.getAmount());
        String tracking = order.getTrackingId() != null ? order.getTrackingId().toString() : "—";
        String address = order.getAddress() != null ? order.getAddress() : "—";

        return """
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5">
              <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
                <div style="background:#131921;padding:24px 32px;display:flex;align-items:center">
                  <span style="font-size:22px;font-weight:800;color:#fff">Shop<em style="font-style:italic;color:#FF9900">Kart</em></span>
                </div>
                <div style="padding:32px">
                  <h2 style="margin:0 0 4px;font-size:20px;color:#111">Order Confirmed!</h2>
                  <p style="margin:0 0 24px;color:#555;font-size:14px">Hi %s, your order has been placed successfully.</p>
                  <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin-bottom:24px">
                    <table style="width:100%%;border-collapse:collapse;font-size:13px">
                      <tr><td style="color:#777;padding:5px 0">Order ID</td><td style="text-align:right;font-weight:700;color:#111">#%s</td></tr>
                      <tr><td style="color:#777;padding:5px 0">Date</td><td style="text-align:right;color:#111">%s</td></tr>
                      <tr><td style="color:#777;padding:5px 0">Tracking ID</td><td style="text-align:right;color:#111;font-size:11px;font-family:monospace">%s</td></tr>
                      <tr><td style="color:#777;padding:5px 0">Deliver To</td><td style="text-align:right;color:#111">%s</td></tr>
                      <tr style="border-top:1px solid #e5e5e5">
                        <td style="color:#111;font-weight:700;padding-top:10px">Total Paid</td>
                        <td style="text-align:right;font-weight:800;font-size:16px;color:#e67e00;padding-top:10px">%s</td>
                      </tr>
                    </table>
                  </div>
                  <p style="font-size:13px;color:#777;margin:0">Questions? Reply to this email or visit your <strong>My Orders</strong> page on ShopKart.</p>
                </div>
                <div style="background:#f5f5f5;padding:16px 32px;text-align:center;font-size:11px;color:#aaa;border-top:1px solid #e5e5e5">
                  © 2025 ShopKart. All rights reserved.
                </div>
              </div>
            </body>
            </html>
            """.formatted(name, order.getId(), date, tracking, address, amount);
    }
}
