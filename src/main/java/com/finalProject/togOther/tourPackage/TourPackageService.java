package com.finalProject.togOther.tourPackage;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.TourPackageDTO;

public interface TourPackageService {

	public ResponseEntity<?> getTourPackageList();

	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq);


}