package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.PlaceReview;
import com.finalProject.togOther.domain.User;

public interface PlaceReviewRepository extends JpaRepository<PlaceReview, Integer> {
	public List<PlaceReview> findByPlaceSeq(int placeSeq);

	public List<PlaceReview> findByReviewSeq(int reviewSeq);
	
	List<PlaceReview> findByUser_UserSeq(int userSeq);
}
