package com.finalProject.togOther.placeReview;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.PlaceReviewDTO;

public interface PlaceReviewService {

	public ResponseEntity<List<PlaceReviewDTO>> getPlaceReviewByPlaceSeq(int placeSeq);

	public ResponseEntity<String> addPlaceReview(PlaceReviewDTO placeReviewDTO);

}
