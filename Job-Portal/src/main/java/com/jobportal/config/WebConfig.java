//package com.jobportal.config;
//
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//// This class provides a global configuration for handling CORS.
//// It is the recommended way to manage CORS for all controllers and endpoints.
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        // This mapping applies to all endpoints in your application.
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000") // Replace with your frontend URL(s)
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all necessary methods
//                .allowedHeaders("*") // Allow all headers, including the Authorization header
//                .allowCredentials(true); // Allow sending cookies and authorization headers
//    }
//}
