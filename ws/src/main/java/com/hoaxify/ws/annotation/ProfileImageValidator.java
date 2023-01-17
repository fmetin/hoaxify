package com.hoaxify.ws.annotation;

import com.hoaxify.ws.util.FileService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class ProfileImageValidator implements ConstraintValidator<ProfileImage, String> {

    private final FileService fileService;

    @Autowired
    public ProfileImageValidator(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return fileService.isValidImage(s);
    }
}
