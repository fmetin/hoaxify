package com.hoaxify.ws.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ACC_USER")
public class User {
    @Id
    @GeneratedValue
    private long id;
    private String username;
    private String password;
    private String displayName;

}
