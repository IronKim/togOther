package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.Planner;

public interface PlannerRepository extends JpaRepository<Planner, Integer> {
    List<Planner> findAllByTitleContainingOrderByLogTimeDesc(Pageable pageable,@Param("title") String search);
    long countByTitleContaining(@Param("title") String search);
}