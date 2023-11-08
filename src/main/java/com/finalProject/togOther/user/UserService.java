package com.finalProject.togOther.user;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.RegisterDTO;

public interface UserService {

	public ResponseEntity<String> addUser(RegisterDTO registerDTO);

	public ResponseEntity<String> deleteUser(String userEmail);

	public ResponseEntity<RegisterDTO> getUserByEmail(String userEmail);

}
