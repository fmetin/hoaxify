package com.hoaxify.ws.controller;

import com.hoaxify.ws.dto.CreateUserRequestDto;
import com.hoaxify.ws.rc.HoaxifyResponseCodes;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.RestException;
import com.hoaxify.ws.shared.RestResponse;
import com.hoaxify.ws.shared.RestResponseHeader;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.hoaxify.ws.rc.HoaxifyResponseCodes.*;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/v1/create-user")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        userService.createUser(request);
        return ResponseEntity.ok(new RestResponse<>());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public RestResponse<Void> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError fieldError :
                e.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new RestResponse<>(
                new RestResponseHeader(VALIDATION_ERROR.getResponseCode(),
                        VALIDATION_ERROR.getResponseMessage()),
                null, validationErrors
        );
    }
}
