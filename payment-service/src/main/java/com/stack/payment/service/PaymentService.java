package com.stack.payment.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stack.payment.client.OrderServiceClient;
import com.stack.payment.dto.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

@Service
public class PaymentService {

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    private final OrderServiceClient orderServiceClient;

    public PaymentService(OrderServiceClient orderServiceClient) {
        this.orderServiceClient = orderServiceClient;
    }

    public CreateOrderResponse createOrder(CreateOrderRequest request) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject options = new JSONObject();
        options.put("amount", request.getAmount() * 100); // convert to paise
        options.put("currency", "INR");
        options.put("receipt", "order_" + request.getUserId() + "_" + System.currentTimeMillis());
        Order razorpayOrder = client.orders.create(options);
        return new CreateOrderResponse(
                razorpayOrder.get("id"),
                request.getAmount(),
                "INR",
                keyId
        );
    }

    public Object verifyAndPlace(VerifyPaymentRequest request) throws Exception {
        String payload = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        String computed = HexFormat.of().formatHex(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));

        if (!computed.equals(request.getRazorpaySignature())) {
            throw new SecurityException("Payment signature verification failed");
        }

        PlaceOrderDto placeOrderDto = new PlaceOrderDto();
        placeOrderDto.setUserId(request.getUserId());
        placeOrderDto.setAddress(request.getAddress());
        placeOrderDto.setOrderDescription(request.getOrderDescription());
        placeOrderDto.setRazorpayPaymentId(request.getRazorpayPaymentId());
        return orderServiceClient.placeOrder(placeOrderDto);
    }
}
