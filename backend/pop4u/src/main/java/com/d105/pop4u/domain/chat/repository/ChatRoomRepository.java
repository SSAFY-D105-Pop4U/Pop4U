package com.d105.pop4u.domain.chat.repository;

import com.d105.pop4u.domain.chat.entity.ChatRoom;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByPopupStore(PopupStore popupStore); // ✅ 팝업스토어 ID로 채팅방 조회
}
