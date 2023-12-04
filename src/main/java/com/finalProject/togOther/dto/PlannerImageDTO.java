package com.finalProject.togOther.dto;


import com.finalProject.togOther.domain.PlannerImage;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PlannerImageDTO {
	private int plImageSeq;
	private int plMainSeq;
	private int nday;
	@Column(length = 500)
	private String image;
	
	
	public static PlannerImageDTO toDTO(PlannerImage plannerImage) {
		
		return PlannerImageDTO.builder()
							  .plImageSeq(plannerImage.getPlImageSeq())
							  .plMainSeq(plannerImage.getPlMainSeq())
							  .nday(plannerImage.getNday())
							  .image(plannerImage.getImage())
							  .build();
	}
	
}
//`plImageSeq`	int	NOT NULL,
//`plMainSeq`	int	NOT NULL,
//`nDay`	date	NOT NULL,
//`image`	text	NOT NULL