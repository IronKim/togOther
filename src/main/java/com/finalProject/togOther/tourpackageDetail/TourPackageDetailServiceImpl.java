package com.finalProject.togOther.tourpackageDetail;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.TourPackageDetail;
import com.finalProject.togOther.dto.TourPackageDetailDTO;
import com.finalProject.togOther.repository.TourPackageDetailRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourPackageDetailServiceImpl implements TourPackageDetailService{
	
	private TourPackageDetailRepository tourPackageDetailRepository;

	public TourPackageDetailServiceImpl(TourPackageDetailRepository tourPackageDetailRepository) {
		this.tourPackageDetailRepository = tourPackageDetailRepository;
	}

	@Override
	public ResponseEntity<TourPackageDetailDTO> getTourDetailPackageByTpSeq(int tpSeq) {
		
		try {
			Optional<TourPackageDetail> tourPackageDetailOptional = tourPackageDetailRepository.findByTpSeq(tpSeq);

			TourPackageDetail tourPackageDetail = tourPackageDetailOptional.orElseThrow();

			TourPackageDetailDTO tourPackageDetailDTO = TourPackageDetailDTO.toDTO(tourPackageDetail);

			return ResponseEntity.ok(tourPackageDetailDTO);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}



}
