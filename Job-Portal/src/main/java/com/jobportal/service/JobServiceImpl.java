package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.Utilities;

@Service("jobService")
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepository;

	// Create Job
	@Override
	public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
		jobDTO.setId(Utilities.getNetSequence("jobs"));
		jobDTO.setPostTime(LocalDateTime.now());
		Job newJob = jobRepository.save(jobDTO.toEntity());
		return newJob.toDTO();
	}

	// Get all jobs
	@Override
	public List<JobDTO> getAllJobs() {
	    return jobRepository.findAll()
	                        .stream()
	                        .map(job -> job.toDTO())
	                        .collect(Collectors.toList());
	}
	
	// Get Job by Id
	@Override
	public JobDTO getJob(Long id) throws JobPortalException {
	    return jobRepository.findById(id)
	                        .map(Job::toDTO)
	                        .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
	}

	@Override
	public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
		
		Job job = jobRepository.findById(id).orElseThrow(() ->new JobPortalException("JOB_NOT_FOUND"));
		List<Applicant> applicants = job.getApplicants();
		if(applicants==null)applicants  = new ArrayList<>();
		if(applicants.stream().filter((x)->x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0)throw new JobPortalException("JOB_APPLIED_ALREADY");
		applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
		applicants.add(applicantDTO.toEntity());
		System.out.println("Applicant : " + applicants);
		job.setApplicants(applicants);
	    jobRepository.save(job);
		
	}

	@Override
	public List<JobDTO> getJobPostedBy(Long id) {
		 return jobRepository.findByPostedBy(id)
                 .stream()
                 .map(job -> job.toDTO())
                 .collect(Collectors.toList());
	}

	@Override
	public void changeAppStatus(Application application) throws JobPortalException {
		Job job = jobRepository.findById(application.getId()).orElseThrow(() ->new JobPortalException("JOB_NOT_FOUND"));
		List<Applicant> applicants = job.getApplicants().stream().map((x)->{
			if(application.getApplicantId() == x.getApplicantId()) {
				x.setApplicationStatus(application.getApplicationStatus());
				if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING))x.setInterviewTime(application.getInterviewTime());
			}
			return x;
		}).toList();
		job.setApplicants(applicants);
		jobRepository.save(job);
		
	}

	
	
}
