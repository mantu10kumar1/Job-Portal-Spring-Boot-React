package com.jobportal.api;

import java.util.List;

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

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.JobService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/jobs")
public class JobAPI {
	@Autowired
	private JobService jobService;
	
	// Create Job
	@PostMapping("/post")
	public ResponseEntity<JobDTO> postJob(@RequestBody @Valid JobDTO jobDTO) throws JobPortalException{
		return new ResponseEntity<>(jobService.postJob(jobDTO) , HttpStatus.CREATED);
	}
	
	// Get all Jobs
	@GetMapping("getAll")
	public ResponseEntity<List<JobDTO>> getAllJobs() throws JobPortalException{
		return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
	}
	
	// Get Job by id
	@GetMapping("get/{id}")
	public ResponseEntity<JobDTO> getJob(@PathVariable Long id) throws JobPortalException{
		return new ResponseEntity<>(jobService.getJob(id), HttpStatus.OK);
	}
	
	// Apply job  api
	  @PostMapping("/apply/{id}")
	    public ResponseEntity<ResponseDTO> applyForJob(@PathVariable Long id, @RequestBody  ApplicantDTO applicantDTO) throws JobPortalException {
		  System.out.println("NAME" + applicantDTO.getName());

		  System.out.println("NAME" + applicantDTO.getEmail());
          jobService.applyJob(id, applicantDTO);
	        
	        // Use HttpStatus.CREATED (201) because a new application resource is being created.
	        return new ResponseEntity<>(new ResponseDTO("Applied Success"), HttpStatus.CREATED);
	    }
	  
	// Get job posted by
		@GetMapping("postedBy/{id}")
		public ResponseEntity<List<JobDTO>> getJobsPostedBy(@PathVariable Long id) throws JobPortalException{
			return new ResponseEntity<>(jobService.getJobPostedBy(id), HttpStatus.OK);
		}
		
		// This api made for change applicatioin status
		  @PostMapping("/changeAppStatus")
		    public ResponseEntity<ResponseDTO> changeAppStatus(@RequestBody  Application application) throws JobPortalException {
	          jobService.changeAppStatus(application);
		        
		        // Use HttpStatus.CREATED (201) because a new application resource is being created.
		        return new ResponseEntity<>(new ResponseDTO("Application Status Changed Successfully."), HttpStatus.CREATED);
		    }
	
}
