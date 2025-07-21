package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Utilities;

@Service(value="userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
		userDTO.setId(Utilities.getNetSequence("users"));
		User user = userDTO.toEntity();
		user = userRepository.save(user);
		return user.toDTO();
		
	}

}
