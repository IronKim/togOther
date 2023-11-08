package com.finalProject.togOther.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.RegisterDTO;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public Optional<User> findById(String id);
	
	public void deleteById(String id);
	
	public void deleteByEmail(String email);

	public Optional<User> findByEmail(String userEmail);
}
