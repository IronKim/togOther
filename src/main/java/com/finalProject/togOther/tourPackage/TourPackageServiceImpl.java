package com.finalProject.togOther.tourPackage;

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
public class TourPackageServiceImpl implements TourPackageService {

	private TourPackageRepository tourPackageRepository;
	

	public TourPackageServiceImpl(TourPackageRepository tourPackageRepository ) {
		this.tourPackageRepository = tourPackageRepository;
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
	public ResponseEntity<List<TourPackageDTO>> getTourPackageByCitySeq(int citySeq) {
		
		try {
			List<TourPackage> packageList = tourPackageRepository.findByCitySeq(citySeq);

			List<TourPackageDTO> packageDTOList = new ArrayList<TourPackageDTO>();

			for (TourPackage package1 : packageList) {

				TourPackageDTO packageDTO = TourPackageDTO.toDTO(package1);

				packageDTOList.add(packageDTO);
			}

			return ResponseEntity.ok(packageDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

}
