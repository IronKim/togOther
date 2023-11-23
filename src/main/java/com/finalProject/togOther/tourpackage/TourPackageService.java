package com.finalProject.togOther.tourpackage;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.TourPackageDTO;

public interface TourPackageService {

	public ResponseEntity<List<TourPackageDTO>> getTourPackgeList();

	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq);
}
