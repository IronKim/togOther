package com.finalProject.togOther.profile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.dto.UserDTO;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

	private UserRepository userRepository;
	
	public ProfileServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public ResponseEntity<UserDTO> getUserByUserSeq(int userSeq) {
		try {
			Optional<User> userOptional = userRepository.findById(userSeq);
			
			User user = userOptional.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			return ResponseEntity.ok(userDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
