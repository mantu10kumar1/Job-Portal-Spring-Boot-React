package com.jobportal.config;
import com.jobportal.utility.ExceptionControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.jobportal.jwt.JwtAuthenticationEntryPoint;
import com.jobportal.jwt.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	@Autowired
	private JwtAuthenticationEntryPoint point;
	@Autowired
	private JwtAuthenticationFilter filter;

	 @Bean
	    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

	        http .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        
	            .authorizeHttpRequests((requests) -> requests
	            		
//	                .requestMatchers("/api/**").authenticated()
//	                .anyRequest().permitAll())
	            
	            .requestMatchers("/auth/login","/users/register",
//	    				"/profiles/**","/notification/**" ,
	    				"/users/verifyOtp/**","/users/sendOtp/**").permitAll()
	    		.anyRequest()
	    		.authenticated())
//	            .addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
	            
//	            .addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
	            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
	            .httpBasic(withDefaults())
	            .csrf(csrfConfig -> csrfConfig.disable())
	            .cors(cors -> cors.configurationSource(configurationSource())) ; // Enable Basic Authentication

	        return http.build();
	    }
	 
	 private CorsConfigurationSource configurationSource() {
		
		 
		 
		return new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration cfg = new CorsConfiguration();
				cfg.setAllowedOrigins(Arrays.asList(
						"http://localhost:3000/"));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowCredentials(true);
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setExposedHeaders(Arrays.asList(
						"Authorization"));
				
				cfg.setMaxAge(3600L);
				
				return cfg;
			}
		};
	}

	
}

  /*  private final ExceptionControllerAdvice exceptionControllerAdvice;
	
	@Autowired
	private JwtAuthenticationEntryPoint point;
	@Autowired
	private JwtAuthenticationFilter filter;

    SecurityConfig(ExceptionControllerAdvice exceptionControllerAdvice) {
        this.exceptionControllerAdvice = exceptionControllerAdvice;
    }

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.authorizeHttpRequests((req) ->
//		req.requestMatchers("/**").permitAll().anyRequest().authenticated());
//		
//		http.csrf(csrf -> csrf.disable());
//		return http.build();
		http.csrf(csrf-> csrf.disable())
		.authorizeRequests()
		.requestMatchers("/auth/login","/users/register",
//				"/profiles/**","/notification/**" ,
				"/users/verifyOtp/**","/users/sendOtp/**").permitAll()
		.anyRequest()
		.authenticated()
		.and().exceptionHandling(ex -> ex.authenticationEntryPoint(point))
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		

		return http.build();
	} 
	*/
	

	
	
//}
