package com.finalProject.togOther.profile;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.UserDTO;

public interface ProfileService {

	public ResponseEntity<UserDTO> getUserByUserSeq(int userSeq);

}
