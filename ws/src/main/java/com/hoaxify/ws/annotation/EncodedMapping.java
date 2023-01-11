package com.hoaxify.ws.annotation;

import org.mapstruct.Qualifier;
import java.lang.annotation.*;

@Qualifier // org.mapstruct.Qualifier
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.CLASS)
public @interface EncodedMapping {
}