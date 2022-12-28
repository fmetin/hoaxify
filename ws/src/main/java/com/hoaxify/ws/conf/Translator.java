//package com.hoaxify.ws.conf;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.context.i18n.LocaleContextHolder;
//import org.springframework.context.support.ResourceBundleMessageSource;
//import org.springframework.stereotype.Component;
//
//import java.util.Locale;
//
//@Component
//public class Translator {
//    private static ResourceBundleMessageSource bundleMessageSource;
//
//    public Translator(ResourceBundleMessageSource bundleMessageSource){
//        this.bundleMessageSource = bundleMessageSource;
//
//    }
//
//    public static String toLocale(String code) {
//        Locale locale = LocaleContextHolder.getLocale();
//        return bundleMessageSource.getMessage(code, null, locale);
//    }
//
//
//}
