package com.bezkoder.spring.security.postgresql.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bezkoder.spring.security.postgresql.models.Job;
import com.bezkoder.spring.security.postgresql.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class JobController {

    @Autowired
    JobRepository jobRepository;

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs(@RequestParam(required = false) String title) {
        try {
            List<Job> jobs = new ArrayList<Job>();

            if (title == null)
                jobRepository.findAll().forEach(jobs::add);
            else
                jobRepository.findByTitle(title).forEach(jobs::add);

            if (jobs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(jobs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable("id") long id) {
        Optional<Job> jobData = jobRepository.findById(id);

        if (jobData.isPresent()) {
            return new ResponseEntity<>(jobData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        try {
            Job _job = jobRepository
                    .save(new Job(job.getTitle(), job.getSalary(), job.getCategory(), job.getDescription()));
            return new ResponseEntity<>(_job, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable("id") long id, @RequestBody Job job) {
        Optional<Job> jobData = jobRepository.findById(id);

        if (jobData.isPresent()) {
            Job _job = jobData.get();
            _job.setTitle(job.getTitle());
            _job.setSalary(job.getSalary());
            _job.setCategory(job.getCategory());
            _job.setDescription(job.getDescription());
            return new ResponseEntity<>(jobRepository.save(_job), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<HttpStatus> deleteJob(@PathVariable("id") long id) {
        try {
            jobRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/jobs")
    public ResponseEntity<HttpStatus> deleteAllJobs() {
        try {
            jobRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
