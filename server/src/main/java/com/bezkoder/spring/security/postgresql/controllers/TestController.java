package com.bezkoder.spring.security.postgresql.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('EMPLOYEE') or hasRole('EMPLOYER') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/employee")
	@PreAuthorize("hasRole('EMPLOYEE')")
	public String employeeAccess() {
		return "Employee Board.";
	}

	@GetMapping("/employer")
	@PreAuthorize("hasRole('EMPLOYER')")
	public String employerAccess() {
		return "Employer Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Employer Board.";
	}
}
