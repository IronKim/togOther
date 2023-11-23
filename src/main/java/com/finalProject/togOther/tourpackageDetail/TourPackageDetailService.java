package com.finalProject.togOther.tourpackageDetail;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.TourPackageDetailDTO;

public interface TourPackageDetailService {

	public ResponseEntity<TourPackageDetailDTO> getTourDetailPackageByTpSeq(int tpSeq);
}
