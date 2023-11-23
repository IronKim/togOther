package com.finalProject.togOther.tourpackage;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.TourPackageDTO;

@RestController
@RequestMapping("api/package")
public class TourPackageController {

	private TourPackageService tourpackageService;
	
	public TourPackageController(TourPackageService tourPackageService) {
		this.tourpackageService = tourPackageService;
	}
	
	// 투어 패키지 리스트 불러오기
	@GetMapping(path = "getTourPackgeList")
	public ResponseEntity<List<TourPackageDTO>> getTourPackgeList() {
		return tourpackageService.getTourPackgeList();
	}
	
	// 투어 패키지 도시 번호로 불러오기
	@GetMapping(path = "getTourPackageByCitySeq/{citySeq}")
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(@PathVariable int citySeq) {
		return tourpackageService.getTourPackageByCitySeq(citySeq);
	}
}
