package com.hoaxify.ws.annotation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqueUserNameValidator.class}
)
public @interface UniqueUserName {

    String message() default "{jakarta.validation.constraints.UniqueUserName.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
