package com.finalProject.togOther.profile;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.UserDTO;

@RestController
@RequestMapping("api/profile")
public class ProfileController {

	private ProfileService profileService;
	
	public ProfileController(ProfileService profileService) {
		this.profileService = profileService;
	}
	
	@GetMapping(path = "getUserByUserSeq/{userSeq}")
	public ResponseEntity<UserDTO> getUserByUserSeq(@PathVariable int userSeq) {
		return profileService.getUserByUserSeq(userSeq);
	}
	
	
	
}
