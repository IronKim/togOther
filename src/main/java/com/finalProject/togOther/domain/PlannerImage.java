package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.PlannerImageDTO;

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
public class PlannerImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plImageSeq;
	private int plMainSeq;
	private int nday;
	
	@Column(length = 500)
	private String image;
	
	public static PlannerImage toEntity(PlannerImageDTO plannerImageDTO) {
		
		return PlannerImage.builder()
						   .plImageSeq(plannerImageDTO.getPlImageSeq())
						   .plMainSeq(plannerImageDTO.getPlMainSeq())
						   .nday(plannerImageDTO.getNday())
						   .image(plannerImageDTO.getImage())
						   .build();
	}
	
}