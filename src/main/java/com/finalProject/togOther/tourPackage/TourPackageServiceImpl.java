package com.finalProject.togOther.tourPackage;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.TourPackage;
import com.finalProject.togOther.domain.TourPackageDetail;
import com.finalProject.togOther.dto.TourPackageDTO;
import com.finalProject.togOther.repository.TourPackageDetailRepository;
import com.finalProject.togOther.repository.TourPackageRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourPackageServiceImpl implements TourPackageService {

	private TourPackageRepository tourPackageRepository;
	
	private TourPackageDetailRepository tourPackageDetailRepository;

	public TourPackageServiceImpl(TourPackageRepository tourPackageRepository, TourPackageDetailRepository tourPackageDetailRepository) {
		this.tourPackageRepository = tourPackageRepository;
		this.tourPackageDetailRepository = tourPackageDetailRepository;
	}

	@Override
	public ResponseEntity<?> addTourPackage(TourPackageDTO tourPackageDTO) {

		try {

			TourPackageDetail detail = TourPackageDetail.builder()
	                .tpdImages("sdzdsafd")
	                .tpdcontext("sadsadsa")
	                .tpdsaleStart("sadsa")
	                .tpdsaleEnd("sadsadsa")
	                .build();

	        tourPackageDetailRepository.save(detail);
			
			System.out.println("여긴가");

			TourPackageDTO tourPackageDTO2 = TourPackageDTO.builder()
	                .citySeq(1)
	                .tourPackageDetail(detail)
	                .tpTitle("title")
	                .tpThumbnail("thumbnail")
	                .tpPrice("price")
	                .build();

	        tourPackageRepository.save(TourPackage.toEntity(tourPackageDTO2));
		} catch (Exception e) {
			e.printStackTrace();
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
		try {
			TourPackage tourPackage = tourPackageRepository.findById(4)
		            .orElseThrow(() -> new RuntimeException("TourPackage not found with tpSeq: " + 4));
			
			// TourPackage에 연관된 TourPackageDetail 엔티티 조회
		    TourPackageDetail tourPackageDetail = tourPackage.getTourPackageDetail();

		    // TourPackageDetail이 null이 아니면 tpdcontext 반환, null이면 예외 처리 또는 다른 처리 수행
		    return ResponseEntity.ok(tourPackageDetail != null ? tourPackageDetail.getTpdcontext() : "TourPackageDetail not found for tpSeq: " + 4);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
