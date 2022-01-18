package com.bezkoder.spring.security.postgresql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.spring.security.postgresql.models.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitle(String title);
}
