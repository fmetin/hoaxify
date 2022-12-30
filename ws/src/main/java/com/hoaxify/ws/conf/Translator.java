package com.hoaxify.ws.conf;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class Translator {
    private static ResourceBundleMessageSource bundleMessageSource;

    public Translator(ResourceBundleMessageSource bundleMessageSource) {
        Translator.bundleMessageSource = bundleMessageSource;

    }

    public static String toLocale(String code) {
        Locale locale = LocaleContextHolder.getLocale();
        return bundleMessageSource.getMessage(fixText(code), null, locale);
    }

    public static String toLocaleWithArgs(String code, String[] args) {
        Locale locale = LocaleContextHolder.getLocale();
        return bundleMessageSource.getMessage(fixText(code), args, locale);
    }

    public static String fixText(String text) {
        return text.substring(1, text.length() - 1);
    }
}
