package com.hoaxify.ws.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static com.hoaxify.ws.error.HoaxifyResponseMessage.*;


@Getter
@Setter
@Entity
@Table(name = "ACC_USER")
public class User {
    @Id
    @GeneratedValue
    private long id;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_USERNAME_NOTNULL)
    @Size(min = 4, max = 255, message = MSG_VALIDATION_CONSTRAINT_USERNAME_SIZE)
    private String username;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_DISPLAYNAME_NOTNULL)
    private String displayName;
    @NotNull(message = MSG_VALIDATION_CONSTRAINT_PASSWORD_NOTNULL)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = MSG_VALIDATION_CONSTRAINT_PASSWORD_PATTERN)
    private String password;
    private String image;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Hoax> hoaxes;

}
