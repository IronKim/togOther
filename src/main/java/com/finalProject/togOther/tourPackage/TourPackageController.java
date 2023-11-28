package com.finalProject.togOther.tourPackage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@PostMapping(path ="addTourPackage")
	public ResponseEntity<?> addTourPackage() {
		TourPackageDTO tourPackageDTO = null;
		return tourpackageService.addTourPackage(tourPackageDTO);
	}
	
	@GetMapping(path ="getTourPackageList")
	public ResponseEntity<?> getTourPackageList() {
		return tourpackageService.getTourPackageList();
	}
	
	@GetMapping(path ="getTourPackageContext")
	public ResponseEntity<?> getTourPackageContext() {
		return tourpackageService.getTourPackageContext();
	}
}
