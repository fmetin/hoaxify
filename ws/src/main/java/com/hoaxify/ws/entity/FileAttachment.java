package com.hoaxify.ws.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "FILE_ATTACHMENT")
public class FileAttachment {
    @Id
    @GeneratedValue
    private long id;

    private String name;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @OneToOne
    @JoinColumn(name = "hoax_id")
    private Hoax hoax;
}
