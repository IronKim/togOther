package com.finalProject.togOther.tourPackage;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.repository.TourPackageRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourPackageServiceImpl implements TourPackageService {

	private TourPackageRepository tourPackageRepository;
	

	public TourPackageServiceImpl(TourPackageRepository tourPackageRepository ) {
		this.tourPackageRepository = tourPackageRepository;
	}

	@Override
	public ResponseEntity<?> addTourPackage(TourPackageDTO tourPackageDTO) {
		try {
			
		} catch (Exception e) {
		}

		return null;
	}
	
	@Override
	public ResponseEntity<?> getTourPackageList() {
		try {
			return ResponseEntity.ok(tourPackageRepository.findAll());
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	
	@Override
	public ResponseEntity<?> getTourPackageContext() {
		return null;
	}
}
