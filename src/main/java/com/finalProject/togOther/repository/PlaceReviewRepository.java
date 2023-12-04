package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.PlaceReview;

public interface PlaceReviewRepository extends JpaRepository<PlaceReview, Integer> {
	public List<PlaceReview> findByPlaceSeq(int placeSeq); // 이거 맞는지 모르겟음

	public List<PlaceReview> findByReviewSeq(int reviewSeq);
}
