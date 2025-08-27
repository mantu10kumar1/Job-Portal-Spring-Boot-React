package com.jobportal.jwt;

import com.jobportal.api.NotificationAPI;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JWT Helper Class for Spring Boot
 * A utility class for handling JSON Web Tokens (JWT) for authentication in a Spring Boot application.
 * It's marked as a Spring @Component to allow for dependency injection.
 *
 * Dependencies:
 * To use this class, you need to add the following dependencies to your project.
 *
 * Maven:
 * <dependency>
 * <groupId>io.jsonwebtoken</groupId>
 * <artifactId>jjwt-api</artifactId>
 * <version>0.11.5</version>
 * </dependency>
 * <dependency>
 * <groupId>io.jsonwebtoken</groupId>
 * <artifactId>jjwt-impl</artifactId>
 * <version>0.11.5</version>
 * <scope>runtime</scope>
 * </dependency>
 * <dependency>
 * <groupId>io.jsonwebtoken</groupId>
 * <artifactId>jjwt-jackson</artifactId>
 * <version>0.11.5</version>
 * <scope>runtime</scope>
 * </dependency>
 *
 * Gradle:
 * implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
 * runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
 * runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
 */
@Component
public class JwtHelper {

    private final NotificationAPI notificationAPI;

    private final Key SECRETE_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // total expiration time in milliseconds
    private final long JWT_TOKEN_VLIDITY = 3600000 ;

    JwtHelper(NotificationAPI notificationAPI) {
        this.notificationAPI = notificationAPI;
    } // 1 hour
    
    // Retrieve expiration date from the JWT token
    public String getUsernameFromToken(String token) {
    	return getClaimFromToken(token, Claims::getSubject);
    }
    
    // Retrieve expiration date  from the JWT token
    public Date getExpirationDateFromToken(String token) {
    	return getClaimFromToken(token, Claims::getExpiration);
    	
    }
    
    // Retrieve any claim from the JWT token
    public <T> T getClaimFromToken(String token , Function<Claims, T> claimsResolver) {
    	final Claims claims = getAllClaimsFromToken(token);
    	return claimsResolver.apply(claims);
    }
    
    // Get all claims from the token using the secret key
    private Claims getAllClaimsFromToken(String token) {
    	return Jwts.parserBuilder().setSigningKey(SECRETE_KEY).build().parseClaimsJws(token).getBody();
    	
    }
    
    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
    	final Date expiration = getExpirationDateFromToken(token);
    	return expiration.before(new Date());
    }
    
    // Generate a token for the user
    public String generateToken(UserDetails userDetails) {
    	Map<String, Object> claims = new HashMap<>();
    	return doGenerateToken(claims , userDetails.getUsername());
    }
    
    // Create the token by signing it with the secret key
    private String doGenerateToken(Map<String, Object> claims, String subject) {
    	return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
    			.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VLIDITY))
    			.signWith(SECRETE_KEY)
    			.compact();
    }
    
    // Validate the token
    public Boolean validateToken(String token , String username) {
    	final String tokenUsername = getUsernameFromToken(token);
    	return (tokenUsername.equals(username) && !isTokenExpired(token));
    	
    }
    


}
