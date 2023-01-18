package com.hoaxify.ws.entity;


import jakarta.persistence.*;
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
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;
}
