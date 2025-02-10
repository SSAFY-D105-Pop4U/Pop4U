package com.d105.pop4u.domain.notification.repository;

import com.d105.pop4u.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
