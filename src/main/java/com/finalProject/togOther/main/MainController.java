package com.finalProject.togOther.main;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.MainDTO;

@RestController
@RequestMapping("api/main")
public class MainController {
	private MainService mainService;
	
	//도시 리스트 불러오기
	@GetMapping(path= "getCity")
	public ResponseEntity<List<MainDTO>> getCity() {
		return mainService.getCity();
	}
	
	//국가 리스트 불러오기
	@GetMapping(path = "getCountry")
	public ResponseEntity<List<MainDTO>> getConuntry() {
		return mainService.getCountry(); 
	}
	
	//지역 리스트 불러오기
	@GetMapping(path = "getRegion")
	public ResponseEntity<List<MainDTO>> getRegion() {
		return mainService.getRegion();
	}
	
}
