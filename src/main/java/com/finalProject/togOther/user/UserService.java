package com.finalProject.togOther.user;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;

public interface UserService {

	public ResponseEntity<String> addUser(RegisterDTO registerDTO);

	public ResponseEntity<String> deleteUser(String userEmail);

	public ResponseEntity<RegisterDTO> getUserByEmail(String userEmail);

	public ResponseEntity<SSODTO> processCertificationRequest(String impUid);

	public ResponseEntity<Boolean> isUserExistsByPhone(String phone);

	public ResponseEntity<LoginInResponseDTO> LoginUser(LoginDTO loginDTO);

	public ResponseEntity<LoginInResponseDTO> getUserByToken(String authorizationHeader);
}
