package com.jobportal.jwt;

import com.jobportal.api.NotificationAPI;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Component
public class JwtHelper {

    private final NotificationAPI notificationAPI;

    private final Key SECRETE_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // total expiration time in milliseconds
    private final long JWT_TOKEN_VLIDITY = 86400000 ; // 24 hours

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
    	CustomUserDetails customUser = (CustomUserDetails) userDetails;
    	claims.put("id", customUser.getId());
    	claims.put("name", customUser.getName());
    	claims.put("accountType", customUser.getAccountType());
    	claims.put("profileId", customUser.getProfileId());
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




/*
package com.jobportal.jwt;

import com.jobportal.api.NotificationAPI;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {

    private final NotificationAPI notificationAPI;

    // --- FIX: The secret key should be a static and consistent value. ---
    // This new key is long and cryptographically secure.
    // Remember, DO NOT hard-code this in production. Store it in a properties file.
    private static final String SECRET_KEY_STRING = "d22c53f80c65c4a6b245a4982a88e998e3b12d596b6e4e548812c3f1011d8d47";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());

    // Total expiration time in milliseconds
    private final long JWT_TOKEN_VALIDITY = 86400000; // 24 hours

    JwtHelper(NotificationAPI notificationAPI) {
        this.notificationAPI = notificationAPI;
    }
    
    // Retrieve expiration date from the JWT token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    // Retrieve expiration date from the JWT token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    // Retrieve any claim from the JWT token
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    
    // Get all claims from the token using the secret key
    private Claims getAllClaimsFromToken(String token) {
        // --- FIX: Use the static SECRET_KEY to parse the token. ---
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }
    
    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    // Generate a token for the user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Assuming CustomUserDetails is correctly implemented and available
        CustomUserDetails customUser = (CustomUserDetails) userDetails;
        claims.put("id", customUser.getId());
        claims.put("name", customUser.getName());
        claims.put("accountType", customUser.getAccountType());
        claims.put("profileId", customUser.getProfileId());
        return doGenerateToken(claims, userDetails.getUsername());
    }
    
    // Create the token by signing it with the secret key
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        // --- FIX: Use the static SECRET_KEY to sign the token. ---
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SECRET_KEY)
                .compact();
    }
    
    // Validate the token
    public Boolean validateToken(String token, String username) {
        final String tokenUsername = getUsernameFromToken(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }
}
*/