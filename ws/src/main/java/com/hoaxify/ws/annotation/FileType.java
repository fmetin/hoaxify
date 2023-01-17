package com.hoaxify.ws.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static com.hoaxify.ws.shared.RestResponseMessage.MSG_VALIDATION_CONSTRAINT_PROFILE_IMAGE;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {FileTypeValidator.class}
)
public @interface FileType {
    String message() default MSG_VALIDATION_CONSTRAINT_PROFILE_IMAGE;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] types() default {"png", "jpeg"};
}
