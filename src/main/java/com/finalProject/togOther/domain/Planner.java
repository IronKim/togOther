package com.finalProject.togOther.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.dto.PlannerDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Planner {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plannerSeq;
	private String cityName;
	private String title;
	private String startDate;
	private String endDate;
	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp logTime;
	private int hit;
	private int likeCnt;
	private byte publicPlan;
	
	
	public static Planner toEntity(PlannerDTO plannerDTO) {
		
		return Planner.builder()
					  .plannerSeq(plannerDTO.getPlannerSeq())
					  .cityName(plannerDTO.getCityName())
					  .title(plannerDTO.getTitle())
					  .startDate(plannerDTO.getStartDate())
					  .endDate(plannerDTO.getEndDate())
					  .logTime(plannerDTO.getLogTime())
					  .hit(plannerDTO.getHit())
					  .likeCnt(plannerDTO.getLikeCnt())
					  .publicPlan(plannerDTO.getPublicPlan())
					  .build();
	}
	
}