package com.finalProject.togOther.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	public Optional<User> findById(String id);
	public void deleteById(String id);
}
