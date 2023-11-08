package com.finalProject.togOther.dto;

import com.finalProject.togOther.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
	
	//이메일
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
	
	public static RegisterDTO toDTO(User user) {
		return RegisterDTO.builder()
				 .email(user.getEmail())
				 .id(user.getId())
				 .pwd(user.getPwd())
				 .name(user.getName())
				 .age(user.getAge())
				 .gender(user.getGender())
				 .national(user.getNational())
				 .profileImage(user.getProfileImage())
				 .profileText(user.getProfileText())
				 .likingFood(user.getLikingFood())
				 .likingTrip(user.getLikingTrip())
				 .mBTI(user.getMBTI())
				 .build();
	}

}
