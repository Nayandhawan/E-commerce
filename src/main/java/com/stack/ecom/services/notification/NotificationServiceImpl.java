package com.stack.ecom.services.notification;

import com.stack.ecom.dto.NotificationDto;
import com.stack.ecom.entity.Notification;
import com.stack.ecom.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repo;

    public NotificationServiceImpl(NotificationRepository repo) {
        this.repo = repo;
    }

    public void create(Long userId, String message) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setMessage(message);
        repo.save(n);
    }

    public List<NotificationDto> getForUser(Long userId) {
        return repo.findTop20ByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(Notification::toDto).collect(Collectors.toList());
    }

    public void markAllRead(Long userId) {
        List<Notification> unread = repo.findByUserIdAndIsReadFalse(userId);
        unread.forEach(n -> n.setRead(true));
        repo.saveAll(unread);
    }

    public long getUnreadCount(Long userId) {
        return repo.countByUserIdAndIsReadFalse(userId);
    }
}
