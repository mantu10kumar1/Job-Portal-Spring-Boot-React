package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.exception.JobPortalException;

import jakarta.validation.Valid;


public interface UserService  {

	public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

	public UserDTO loginUser(@Valid LoginDTO loginDTO) throws JobPortalException;

	
}
