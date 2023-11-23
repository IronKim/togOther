package com.finalProject.togOther.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;
import com.finalProject.togOther.dto.UserDTO;

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

}
