package com.finalProject.togOther.dto;

import java.time.LocalDate;



import com.finalProject.togOther.domain.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
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
	@NotBlank
	@Pattern(regexp = "^[0-9a-zA-Z]([_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}",
    		 message = "올바르지 않은 이메일 형식입니다.")
	private String email;
	//아이디
	private String id;
	//비밀번호
	@NotBlank(message = "비밀번호는 필수 입력값입니다.")
	@Pattern(regexp = "^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{4,20}$",
	         message = "비밀번호는 숫자 또는 영문자 중 하나로 4 ~ 20자리까지 가능합니다.")
	private String pwd;
	//이름
	@NotBlank(message = "이름은 필수 입력값입니다.")
	@Pattern(regexp = "^[a-zA-Z가-힣]{1,30}$",
			 message = "이름은 한글 또는 영문자로 최대 30자까지 입력 가능합니다.")
	private String name;
	//생년월일
	@Past(message = "유효하지 않은 날짜입니다.")
	private LocalDate birthday;
	//핸드폰 번호
	private String phone;
	//성별
	@NotEmpty(message = "성별을 선택해주세요")
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
	//인증된 회원
	private byte certification;
	
	public static RegisterDTO toDTO(User user) {
		return RegisterDTO.builder()
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
						  .certification(user.getCertification())
						  .build();
	}

}
