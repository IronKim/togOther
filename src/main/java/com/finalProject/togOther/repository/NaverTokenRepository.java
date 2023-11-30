package com.finalProject.togOther.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.NaverToken;
import com.finalProject.togOther.domain.RefreshToken;

public interface NaverTokenRepository extends JpaRepository<NaverToken, Integer> {
	
	public Optional<NaverToken> findByUserEmail(String userEmail);
	
	public Optional<NaverToken> findByToken(String token);
}
