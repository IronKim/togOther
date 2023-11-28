package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.PlannerImage;

public interface PlannerImageRepository extends JpaRepository<PlannerImage, Integer> {
	List<PlannerImage> findByPlMainSeqBetween(int minValue, int maxValue);
	List<PlannerImage> findByPlMainSeq(int plMainSeq);
	void deleteByPlMainSeq(int plMainSeq);
}
