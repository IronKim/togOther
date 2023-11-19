package com.finalProject.togOther.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenProvider {
	// JWT 생성 및 검증을 위한 키
	private static final String SECURITY_KEY = "jwtseckeyTogOther!@#";
	
	// JWT 생성하는 메서드
	public String createAccessToken(String userEmail) {
		// 만료날짜를 현재 날짜 + 10분으로 설정
		Date exprTime = Date.from(Instant.now().plus(10, ChronoUnit.MINUTES));
		
		// JWT를 생성
		return Jwts.builder()
				   // 암호화에 사용될 알고리즘, 키
				   .signWith(SignatureAlgorithm.HS512, SECURITY_KEY)
				   // JWT 제목, 생성일, 만료일
				   .setSubject(userEmail)
				   .setIssuedAt(new Date())
				   .setExpiration(exprTime)
				   // 생성
				   .compact();
	}
	
	// JWT 생성하는 메서드
	public String createRefreshToken() {
		
		// 만료날짜를 현재 날짜 + 6개월로 설정
		LocalDateTime now = LocalDateTime.now();
		Date exprTime = Date.from(now.plus(6, ChronoUnit.MONTHS).atZone(java.time.ZoneId.systemDefault()).toInstant());
		
		// JWT를 생성
		return Jwts.builder()
				   // 암호화에 사용될 알고리즘, 키
				   .signWith(SignatureAlgorithm.HS512, SECURITY_KEY)
				   // JWT 생성일, 만료일
				   .setIssuedAt(new Date())
				   .setExpiration(exprTime)
				   // 생성
				   .compact();
	}
	
	// JWT 검증
	public String validate(String token) {
		// 매개변수로 받은 token을 키를 사용해서 복호화
		Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();
		
		// 복호화된 토큰의 payload에서 제목을 가져옴
		return claims.getSubject();
	}

}
