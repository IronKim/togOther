package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.RefreshToken;
import java.util.List;
import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
	
	public Optional<RefreshToken> findByUserEmail(String userEmail);
	
	public Optional<RefreshToken> findByToken(String token);
}
