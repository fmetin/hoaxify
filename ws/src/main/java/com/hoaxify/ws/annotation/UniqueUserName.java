package com.hoaxify.ws.annotation;


import com.hoaxify.ws.rc.HoaxifyMessages;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

import static com.hoaxify.ws.rc.HoaxifyMessages.VALIDATION_CONSTRAINT_UNIQUEUSERNAME;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqueUserNameValidator.class}
)
public @interface UniqueUserName {

    String message() default VALIDATION_CONSTRAINT_UNIQUEUSERNAME;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
