package com.finalProject.togOther.tourPackage;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.TourPackageDTO;

public interface TourPackageService {

	public ResponseEntity<?> addTourPackage(TourPackageDTO tourPackageDTO);

	public ResponseEntity<?> getTourPackageList();

	public ResponseEntity<?> getTourPackageContext();

}
