package com.hoaxify.ws.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "HOAX")
public class Hoax {

    @Id
    @GeneratedValue
    private long id;
    @Size(min = 1, max = 1000)
    @Column(length = 1000)
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;
}