package com.stack.ecom.services.notification;

import com.stack.ecom.dto.NotificationDto;
import java.util.List;

public interface NotificationService {
    void create(Long userId, String message);
    List<NotificationDto> getForUser(Long userId);
    void markAllRead(Long userId);
    long getUnreadCount(Long userId);
}
