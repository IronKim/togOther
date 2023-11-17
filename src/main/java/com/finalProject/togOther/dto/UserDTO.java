package com.finalProject.togOther.dto;

import java.time.LocalDate;

import com.finalProject.togOther.domain.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserDTO {

	private int userSeq;
	//이메일
	private String email;
	//아이디
	private String id;
	//비밀번호
	private String pwd;
	//이름
	private String name;
	//생년월일
	private LocalDate birthday;
	//핸드폰 번호
	private String phone;
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
	//코인
	private int coin;
	//중복로그인여부
	private byte dupLogin;
	//최근 도시
	private String cityList;
	//고정도시
	private String cityFix;
	
	public static UserDTO toDTO(User user) {
		return UserDTO.builder()
				      .userSeq(user.getUserSeq())
				      .email(user.getEmail())
				      .id(user.getId())
				      .pwd(user.getPwd())
				      .name(user.getName())
				      .birthday(user.getBirthday())
				      .phone(user.getPhone())
				      .gender(user.getGender())
				      .national(user.getNational())
				      .profileImage(user.getProfileImage())
				      .profileText(user.getProfileText())
				      .likingFood(user.getLikingFood())
				      .likingTrip(user.getLikingTrip())
				      .mBTI(user.getMBTI())
				      .coin(user.getCoin())
				      .dupLogin(user.getDupLogin())
				      .cityList(user.getCityList())
				      .cityFix(user.getCityFix())
				      .build();
	}
	
}
