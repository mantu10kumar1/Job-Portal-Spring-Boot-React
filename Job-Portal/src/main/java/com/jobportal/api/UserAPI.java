package com.jobportal.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class UserAPI {

    private final UserRepository userRepository;

	@Autowired
	private UserService userService;

    UserAPI(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	// User Register
	@PostMapping("/register")
	public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws JobPortalException{
		Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
		if(optional.isPresent()) throw new JobPortalException("USER_FOUND");
		userDTO = userService.registerUser(userDTO);
		return new ResponseEntity<>(userDTO , HttpStatus.CREATED);
	}
	
	// User Login
		@PostMapping("/login")
		public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO  loginDTO) throws JobPortalException{
			return new ResponseEntity<>(userService.loginUser(loginDTO) , HttpStatus.OK);
		}
		
		// This is for change password 
		@PostMapping("/changePass")
		public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid LoginDTO  loginDTO) throws JobPortalException{
			return new ResponseEntity<>(userService.changePassword(loginDTO) , HttpStatus.OK);
		}
		
		// Send OTP
		@PostMapping("/sendOtp/{email}")
		public ResponseEntity<ResponseDTO> SendOtp(@PathVariable @Email(message="{user.email.invalid}") String email) throws Exception{
			userService.sendOtp(email);
			return new ResponseEntity<>(new ResponseDTO("OTP sent successfully."), HttpStatus.OK);
		}
		
		// Verify Your otp
		@GetMapping("/verifyOtp/{email}/{otp}")
		public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message="{user.email.invalid}") String email , @PathVariable 
			 @Pattern(regexp="^[0-9]{6}$" , message="{otp.invalid}")	String otp) throws JobPortalException{
			userService.verifyOtp(email, otp);
			return new ResponseEntity<>(new ResponseDTO("OTP has been verified."), HttpStatus.OK);
		}
		
}
