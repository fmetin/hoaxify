package com.hoaxify.ws.shared;


import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

import static com.hoaxify.ws.error.HoaxifyResponseCode.BAD_CREDENTIAL;
import static com.hoaxify.ws.error.HoaxifyResponseCode.VALIDATION_ERROR;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public RestResponse<Void> handleAuthenticationException(AuthenticationException e) {
        return new RestResponse<>(
                new RestResponseHeader(BAD_CREDENTIAL.getResponseCode(),
                        BAD_CREDENTIAL.getlocalizedResponseMessage()),
                null, null
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public RestResponse<Void> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError fieldError :
                e.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new RestResponse<>(
                new RestResponseHeader(VALIDATION_ERROR.getResponseCode(),
                        VALIDATION_ERROR.getlocalizedResponseMessage()),
                null, validationErrors
        );
    }

    @ExceptionHandler(RestException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public RestResponse<Void> handleRestException(RestException e) {
        return new RestResponse<>(
                new RestResponseHeader(e.getResponseCode(),
                        e.getResponseMessage()),
                null, null
        );
    }
}