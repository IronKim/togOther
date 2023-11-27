package com.finalProject.togOther.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.finalProject.togOther.domain.Planner;

public interface PlannerRepository extends JpaRepository<Planner, Integer> {
    List<Planner> findAllByTitleContainingAndPublicPlanOrderByLogTimeDesc(Pageable pageable,
    		@Param("title") String search,@Param("PublicPlan") int num);
    long countByTitleContainingAndPublicPlan(@Param("title") String search,@Param("PublicPlan") int num);
    Planner findOneByPlannerSeq(int plannerSeq);
}