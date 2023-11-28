package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.PlannerText;

public interface PlannerTextRepository extends JpaRepository<PlannerText, Integer> {
	List<PlannerText> findByPlMainSeq(int plMainSeq);
	
	void deleteByPlMainSeq(int plMainSeq);
}
