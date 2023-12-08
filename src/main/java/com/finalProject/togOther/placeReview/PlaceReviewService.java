package com.finalProject.togOther.placeReview;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.PlaceReviewDTO;

public interface PlaceReviewService {

	public ResponseEntity<?> getPlaceReviewByPlaceSeq(int placeSeq);

	public ResponseEntity<?> addPlaceReview(int placeSeq, PlaceReviewDTO placeReviewDTO);

	public ResponseEntity<String> deletePlaceReviewByReviewSeq(int placeSeq, int reviewSeq);

	public ResponseEntity<PlaceReviewDTO> updateReview(int reviewSeq, PlaceReviewDTO placeReviewDTO);

	public ResponseEntity<?> getPlaceReviewListByReviewSeq(int reviewSeq);

	public ResponseEntity<?> getPlaceReviewByUserSeq(int userSeq);

}
