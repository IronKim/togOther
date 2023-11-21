package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.finalProject.togOther.domain.Planner;

public interface PlannerRepository extends JpaRepository<Planner, Integer> {
    List<Planner> findAllByOrderByLogTimeDesc(Pageable pageable);
}