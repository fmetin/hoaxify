package com.hoaxify.ws.repository;

import com.hoaxify.ws.entity.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {
}
