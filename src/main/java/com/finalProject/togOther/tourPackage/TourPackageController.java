package com.finalProject.togOther.tourPackage;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.TourPackageDTO;

@RestController
@RequestMapping("api/tourPackage")
public class TourPackageController {
	
	private TourPackageService tourpackageService;
	
	public TourPackageController(TourPackageService tourPackageService) {
		this.tourpackageService = tourPackageService;
	}
	
	@GetMapping(path ="getTourPackageList")
	public ResponseEntity<?> getTourPackageList() {
		return tourpackageService.getTourPackageList();
	}
	
	// citySeq값에 따른 장소 불러오기
	@GetMapping(path = "getTourPackageByCitySeq/{citySeq}")
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(@PathVariable int citySeq) {
		return tourpackageService.getTourPackageByCitySeq(citySeq);
	}
	
	// tqSeq값에 따른 자
	@GetMapping(path = "getTourPackageByTpSeq/{tpSeq}")
	public ResponseEntity<?> getTourPackageByTpSeq(@PathVariable int tpSeq) {
		System.out.println(tpSeq);
		return tourpackageService.getTourPackageByTpSeq(tpSeq);
	}
}
