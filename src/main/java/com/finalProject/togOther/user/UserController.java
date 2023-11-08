package com.finalProject.togOther.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.RegisterDTO;

@RestController
@RequestMapping("api/user")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserServiceImpl userService) {
		this.userService = userService;
	}	
	
	//유저 추가
	@PostMapping(path= "addUser")
	public ResponseEntity<String> addUser(@RequestBody RegisterDTO registerDTO) {
		return userService.addUser(registerDTO);
	}
		
	//유저 삭제
	@DeleteMapping(path= "deleteUser/{userEmail}")
	public ResponseEntity<String> deleteUser(@PathVariable String userEmail) {
		return userService.deleteUser(userEmail);
	}
	
	//유저 조회(이메일)
	@GetMapping(path = "getUserByEmail/{userEmail}")
	public ResponseEntity<RegisterDTO> getUserByEmail(@PathVariable String userEmail) {
		return userService.getUserByEmail(userEmail);
	}
	
	
}
