package com.finalProject.togOther.together;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.TogetherDTO;

@RestController
@RequestMapping("api/together")
public class TogetherController {

	private TogetherService togetherService;

	public TogetherController(TogetherService togetherService) {
		this.togetherService = togetherService;
	}

	@PostMapping(path = "addTogether")
	public ResponseEntity<String> addTogether(@RequestBody TogetherDTO togetherDTO) {
		return togetherService.addTogether(togetherDTO);
	}
}
