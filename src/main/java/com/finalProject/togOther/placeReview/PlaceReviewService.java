package com.finalProject.togOther.placeReview;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.PlaceReviewDTO;

public interface PlaceReviewService {

	public ResponseEntity<?> getPlaceReviewByPlaceSeq(int placeSeq);

	public ResponseEntity<?> addPlaceReview(PlaceReviewDTO placeReviewDTO);

}
