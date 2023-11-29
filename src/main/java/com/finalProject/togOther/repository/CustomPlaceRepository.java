package com.finalProject.togOther.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.CustomPlace;

public interface CustomPlaceRepository extends JpaRepository<CustomPlace, Integer> {

	public void deleteByPlCustomSeq(int togetherSeq);

}
