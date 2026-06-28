package com.stack.ecom.entity;

import com.stack.ecom.dto.NotificationDto;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notifications", indexes = {
    @Index(name = "idx_notif_user_read", columnList = "user_id,is_read"),
    @Index(name = "idx_notif_user_created", columnList = "user_id,created_at")
})
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Column(length = 512)
    private String message;

    private boolean isRead = false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    public Date getCreatedAt() { return createdAt; }

    public NotificationDto toDto() {
        NotificationDto dto = new NotificationDto();
        dto.setId(id);
        dto.setMessage(message);
        dto.setRead(isRead);
        dto.setCreatedAt(createdAt);
        return dto;
    }
}
