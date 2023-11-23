package com.finalProject.togOther.tourpackage;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.TourPackage;
import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.repository.TourPackageRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourPackageServiceImpl implements TourPackageService{
	
	private TourPackageRepository tourPackageRepository;

	public TourPackageServiceImpl(TourPackageRepository tourPackageRepository) {
		this.tourPackageRepository = tourPackageRepository;
	}

	@Override
	public ResponseEntity<List<TourPackageDTO>> getTourPackgeList() {
		try {
			List<TourPackage> tourPackageList = tourPackageRepository.findAll();

			List<TourPackageDTO> tourPackageDTOList = new ArrayList<TourPackageDTO>();

			for (TourPackage tourPackage : tourPackageList) {

				TourPackageDTO tourPackageDTO = TourPackageDTO.toDTO(tourPackage);

				tourPackageDTOList.add(tourPackageDTO);
			}

			return ResponseEntity.ok(tourPackageDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq) {
		
		try {
			List<TourPackage> tourPackageList = tourPackageRepository.findByCitySeq(citySeq);

			List<TourPackageDTO> tourPackageDTOList = new ArrayList<TourPackageDTO>();

			for (TourPackage tourPackage : tourPackageList) {

				TourPackageDTO tourPackageDTO = TourPackageDTO.toDTO(tourPackage);

				tourPackageDTOList.add(tourPackageDTO);
			}

			return ResponseEntity.ok(tourPackageDTOList);


		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}


}
