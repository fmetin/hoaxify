package com.hoaxify.ws.annotation;

import com.hoaxify.ws.util.FileService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {

    private final FileService fileService;
    private String[] validFileTypes;

    @Autowired
    public FileTypeValidator(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public void initialize(FileType constraintAnnotation) {
        validFileTypes = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String file, ConstraintValidatorContext constraintValidatorContext) {
        if (validFileTypes == null || validFileTypes.length == 0)
            return false;
        String supportedTypes = String.join(", ", validFileTypes);
        constraintValidatorContext.disableDefaultConstraintViolation();
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext = constraintValidatorContext.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types", supportedTypes);
        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(constraintValidatorContext.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        return fileService.isValidFileType(file, validFileTypes);
    }
}
