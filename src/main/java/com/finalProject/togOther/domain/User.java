package com.finalProject.togOther.domain;

import org.hibernate.annotations.ColumnDefault;

import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.UserDTO;

import jakarta.persistence.Column;
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
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userSeq;
	//이메일
	@Column(unique = true)
	private String email;
	//아이디
	private String id;
	//비밀번호
	private String pwd;
	//이름
	private String name;
	//나이
	private int age;
	//성별
	@ColumnDefault("M")
	private String gender;
	//국적
	private String national;
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
	@ColumnDefault("0")
	private byte dupLogin;
	//최근 도시
	private String cityList;
	//고정도시
	private String cityFix;
	
	public static User toEntity(UserDTO userDTO) {
		return User.builder()
				   .userSeq(userDTO.getUserSeq())
				   .email(userDTO.getEmail())
				   .id(userDTO.getId())
				   .pwd(userDTO.getPwd())
				   .name(userDTO.getName())
				   .age(userDTO.getAge())
				   .gender(userDTO.getGender())
				   .national(userDTO.getNational())
				   .profileImage(userDTO.getProfileImage())
				   .profileText(userDTO.getProfileText())
				   .likingFood(userDTO.getLikingFood())
				   .likingTrip(userDTO.getLikingTrip())
				   .mBTI(userDTO.getMBTI())
				   .coin(userDTO.getCoin())
				   .dupLogin(userDTO.getDupLogin())
				   .cityList(userDTO.getCityList())
				   .cityFix(userDTO.getCityFix())
				   .build();
	}
	
	public static User toEntity(RegisterDTO registerDTO) {
		
		return User.builder()
				   .email(registerDTO.getEmail())
				   .id(registerDTO.getId())
				   .pwd(registerDTO.getPwd())
				   .name(registerDTO.getName())
				   .age(registerDTO.getAge())
			       .gender(registerDTO.getGender())
				   .national(registerDTO.getNational())
				   .profileImage(registerDTO.getProfileImage())
				   .profileText(registerDTO.getProfileText())
				   .likingFood(registerDTO.getLikingFood())
				   .likingTrip(registerDTO.getLikingTrip())
				   .mBTI(registerDTO.getMBTI())
				   .build();
	}
	
}
