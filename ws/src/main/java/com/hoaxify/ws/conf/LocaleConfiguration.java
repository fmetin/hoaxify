//package com.hoaxify.ws.conf;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.support.ResourceBundleMessageSource;
//import org.springframework.web.servlet.LocaleResolver;
//import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;
//
//import java.util.Locale;
//
//@Configuration
//public class LocaleConfiguration {
//
//    @Value("${hoaxify.baseName:texts}")
//    private String baseName;
//    @Value("${hoaxify.defaultLocale:en}")
//    private String defaultLocale;
//
//    @Bean
//    public ResourceBundleMessageSource messageSource(){
//        ResourceBundleMessageSource bundleMessageSource = new ResourceBundleMessageSource();
//        bundleMessageSource.setBasename(baseName);
//        bundleMessageSource.setDefaultEncoding("UTF-8");
//        bundleMessageSource.setUseCodeAsDefaultMessage(true);
//        return bundleMessageSource;
//    }
//
//    @Bean
//    public LocaleResolver localeResolver(){
//        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
//        localeResolver.setDefaultLocale(new Locale(defaultLocale));
//        return localeResolver;
//    }
//}
