package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
    List<FileAttachment> findByCreatedDateBeforeAndHoaxNull(LocalDateTime createdDate);
}
