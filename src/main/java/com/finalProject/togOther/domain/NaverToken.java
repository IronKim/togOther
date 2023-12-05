package com.finalProject.togOther.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class NaverToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tokenSeq;

	private String userEmail;

	private String token;

	public void setToken(String token) {
		this.token = token;
	}
}
