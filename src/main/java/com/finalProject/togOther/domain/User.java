package com.finalProject.togOther.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userSeq;
	
	@Column(unique = true)
	//아이디
	private String id;
	//비밀번호
	private String pwd;
	//이름
	private String name;
	//나이
	private int age;
	//성별
	private String gender;
	//국적
	private String national;
	//이메일
	private String email;
	//프로필사진
	private String profileImage;
	//소개글
	private String profileText;
	//음식취향
	private String likingFood;
	//여행취향
	private String likingTrip;
	//MBTI
	private String mBTI;
	//코인
	private int coin;
	//중복로그인여부
	private boolean dupLogin;
	//최근 도시
	private String cityList;
	//고정도시
	private int cityFix;
	
}
