package com.finalProject.togOther.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/user")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	// 유저 추가
	@PostMapping(path = "addUser")
	public ResponseEntity<String> addUser(@Valid @RequestBody RegisterDTO registerDTO) {
		return userService.addUser(registerDTO);
	}
	
	// 휴대폰 문자 인증
	@GetMapping(path =  "smsCertificationRequest/{userPhone}")
	public ResponseEntity<String> smsCertificationRequest(@PathVariable String userPhone) {
		return userService.smsCertificationRequest(userPhone);
	}
	
	// 휴대폰 문자 인증
	@GetMapping(path =  "smsRequest/{userPhone}")
	public ResponseEntity<String> smsRequest(@PathVariable String userPhone) {
		return userService.smsRequest(userPhone);
	}
	

	// 유저 삭제
	@DeleteMapping(path = "deleteUser/{userEmail}")
	public ResponseEntity<String> deleteUser(@PathVariable String userEmail) {
		return userService.deleteUser(userEmail);
	}

	// 유저 조회(이메일)
	@GetMapping(path = "getUserByEmail/{userEmail}")
	public ResponseEntity<RegisterDTO> getUserByEmail(@PathVariable String userEmail) {
		return userService.getUserByEmail(userEmail);
	}

	// 통합인증 정보조회
	@PostMapping(path = "handleCertificationRequest")
	public ResponseEntity<SSODTO> handleCertificationRequest(@RequestBody Map<String, String> requestBody) {
		String impUid = requestBody.get("imp_uid");
		return userService.processCertificationRequest(impUid);
	}
	
	// 휴대폰번호로 회원정보가 있는지 확인
	@PostMapping(path = "isUserExistsByPhone")
	public ResponseEntity<Boolean> isUserExistsByPhone(@RequestBody Map<String, String> requestBody) {
		String phone = requestBody.get("phone");
		System.out.println(phone);
		return userService.isUserExistsByPhone(phone);
	}
	
	
	// 로그인
	@PostMapping(path = "loginUser")
	public ResponseEntity<LoginInResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) {
		return userService.LoginUser(loginDTO);
	}
	
	// 로그아웃
	@GetMapping(path = "logoutUser")
	public ResponseEntity<String> logoutUser(@RequestHeader("Refresh-Token") String refreshToken) {
		System.out.println(refreshToken);
		return userService.logoutUser(refreshToken);
	}
	
	// access 토큰으로 로그인
	@GetMapping(path = "getUserByAccessToken")
	public ResponseEntity<LoginInResponseDTO> getUserByAccessToken(@RequestHeader("Authorization") String authorizationHeader) {
        return userService.getUserByAccessToken(authorizationHeader);
    }
	
	// refresh 토큰으로 access토큰 발급
	@GetMapping(path = "getTokenByRefreshToken")
	public ResponseEntity<Void> getTokenByRefreshToken(@RequestHeader("Refresh-Token") String refreshToken) {
		return userService.getTokenByRefreshToken(refreshToken);
	}
	
	// 소개글 수정
	@PutMapping(path = "updateProfileText/{userSeq}")
	public ResponseEntity<String> updateProfileText(@PathVariable int userSeq, @RequestBody Map<String, String> profileText) {
		String updatedProfileText = (profileText.get("profileText"));
		return userService.updateProfileText(userSeq, updatedProfileText);
	}
	
	// 비밀번호 수정
	@PutMapping(path = "updatePassword/{userSeq}")
	public ResponseEntity<String> updatePassword(@PathVariable int userSeq, @RequestBody Map<String, String> requestBody) {
		String pwd = requestBody.get("password");
		String updatedpwd = requestBody.get("updatePassword");
		return userService.updatePassword(userSeq, pwd, updatedpwd);
	}
	
	// 비밀번호 수정 현재 비번 까먹었을때
	@PutMapping(path = "recoveryPassword/{userSeq}")
	public ResponseEntity<String> recoveryPassword(@PathVariable int userSeq, @RequestBody Map<String, String> requestBody) {
		String updatedpwd = requestBody.get("updatePassword");
		System.out.println(updatedpwd);
		return userService.recoveryPassword(userSeq, updatedpwd);
	}
	
	// 휴대전화 수정
	@PutMapping(path = "updatePhone/{userSeq}")
	public ResponseEntity<String> updatePhone(@PathVariable int userSeq, @RequestBody Map<String, String> requestBody) {
		String updatedPhone = requestBody.get("updatePhone");
		return userService.updatePhone(userSeq, updatedPhone);
	}
	
	// 여행취향 수정
	@PutMapping(path = "updateLikingTrip/{userSeq}")
	public ResponseEntity<String> updateLikingTrip(@PathVariable int userSeq, @RequestBody Map<String, String> requestBody) {
		String updatedTripLiking = requestBody.get("tripLiking");
		return userService.updateLikingTrip(userSeq, updatedTripLiking);
	}
	
	// 음식취향 수정
	@PutMapping(path = "updateLikingFood/{userSeq}")
	public ResponseEntity<String> updateLikingFood(@PathVariable int userSeq, @RequestBody Map<String, String> requestBody) {
		String updatedFoodLiking = requestBody.get("foodLiking");
		return userService.updateLikingFood(userSeq, updatedFoodLiking);
	}
	
	// 전화번호로 아이디 가져오기
	@GetMapping(path = "getUserByPhone/{phone}")
	public ResponseEntity<String> getUserByPhone(@PathVariable String phone) {
		return userService.getUserByPhone(phone);
	}
	
	// 인증번호 이메일로 보내기
	@GetMapping(path = "sendEmail/{email}")
	public ResponseEntity<Map<String,String>> sendEmail(@PathVariable String email) {
		return userService.sendEmail(email);
	}
	
	// 좋아요 장소 수정
	@PutMapping(path = "updateLikingPlace/{userSeq}/{placeSeq}")
	public ResponseEntity<?> updateLikingPlace(@PathVariable int userSeq, @PathVariable int placeSeq) {
		return userService.updateLikingPlace(userSeq, placeSeq);
	}
	
	// 회원 탈퇴
	@DeleteMapping(path = "withdrawalUser/{userSeq}")
	public ResponseEntity<String> withdrawalUser(@PathVariable int userSeq) {
		return userService.withdrawalUser(userSeq);
	}

}
