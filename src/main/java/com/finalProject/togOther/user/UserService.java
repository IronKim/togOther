package com.finalProject.togOther.user;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;

public interface UserService {

	public ResponseEntity<String> addUser(RegisterDTO registerDTO);
	
	public ResponseEntity<String> smsCertificationRequest(String userPhone);
	
	public ResponseEntity<String> smsRequest(String userPhone);

	public ResponseEntity<String> deleteUser(String userEmail);

	public ResponseEntity<RegisterDTO> getUserByEmail(String userEmail);

	public ResponseEntity<SSODTO> processCertificationRequest(String impUid);

	public ResponseEntity<Boolean> isUserExistsByPhone(String phone);

	public ResponseEntity<LoginInResponseDTO> LoginUser(LoginDTO loginDTO);

	public ResponseEntity<LoginInResponseDTO> getUserByAccessToken(String authorizationHeader);

	public ResponseEntity<Void> getTokenByRefreshToken(String refreshToken);

	public ResponseEntity<String> logoutUser(String refreshToken);

	public ResponseEntity<String> updateProfileText(int userSeq, String updatedProfileText);

	public ResponseEntity<String> updatePassword(int userSeq, String pwd, String updatedpwd);
	
	public ResponseEntity<String> recoveryPassword(int userSeq,String updatedpwd);

	public ResponseEntity<String> updatePhone(int userSeq, String updatedPhone);
	
	public ResponseEntity<String> updateLikingTrip(int userSeq, String updatedTripLiking);
	
	public ResponseEntity<String> updateLikingFood(int userSeq, String updatedFoodLiking);

	public ResponseEntity<String> getUserByPhone(String phone);
	
	public ResponseEntity<Map<String,String>> sendEmail(String email);
	
	public ResponseEntity<?> updateLikingPlace(int userSeq, int placeSeq);
	
	public ResponseEntity<String> withdrawalUser(int userSeq);

	public ResponseEntity<String> updateMbti(int userSeq, String mbti);

	public ResponseEntity<?> updatecityList(int userSeq, String cityName);
	
	public String kakaoRefreshTokenGet();
	
	public ResponseEntity<?> kakaoRefreshTokenUpdate(String token);

}
