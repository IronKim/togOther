package com.finalProject.togOther.user;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	//사용자 추가 서비스
	@Override
	public ResponseEntity<String> addUser(RegisterDTO registerDTO) {
		
		User user = User.toEntity(registerDTO);
		
		try {
			//사용자 추가 서비스 호출
			userRepository.save(user);
			
			//사용자가 성공적으로 추가되었을 때
			String responseMessage  = "사용자가 추가되었습니다.";
			return ResponseEntity.ok(responseMessage); 
			
		} catch (Exception e) {
			
			//사용자 추가 중 에러가 발생했을 때
			String errorMessage = "사용자 추가 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
		
	}

	//사용자의 삭제 서비스
	@Override
	public ResponseEntity<String> deleteUser(String userEmail) {
		
		try {
			
			//사용자 삭제 서비스 호출
			userRepository.deleteByEmail(userEmail);
			
			//사용자가 성공적으로 삭제되었을 때
            String responseMessage = "사용자가 삭제되었습니다.";
            return ResponseEntity.ok(responseMessage);
            
		} catch (Exception e) {
			
			//사용자 삭제 중 에러가 발생했을 때
            String errorMessage = "사용자 삭제 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}

	
	//사용자 조회 서비스(이메일)
	@Override
	public ResponseEntity<RegisterDTO> getUserByEmail(String userEmail) {

		
		try {
			Optional<User> userOptional = userRepository.findByEmail(userEmail);
			User user = userOptional.orElseThrow();
			
			RegisterDTO registerDTO = RegisterDTO.toDTO(user);
			
			return ResponseEntity.ok(registerDTO);
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	
	}
		
}
