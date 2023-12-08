package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.PlannerTextDTO;

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
public class PlannerText {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plTextSeq;
	private int plMainSeq;
	private String id;
	private int nday;
	private int orders;
	@Column(columnDefinition = "TEXT")
	private String context;
	
	public static PlannerText toEntity(PlannerTextDTO plannerTextDTO) {
		
		return PlannerText.builder()
						  .plTextSeq(plannerTextDTO.getPlTextSeq())
						  .plMainSeq(plannerTextDTO.getPlMainSeq())
						  .id(plannerTextDTO.getId())
						  .nday(plannerTextDTO.getNday())
						  .orders(plannerTextDTO.getOrders()) //0 플래너 1 동행 2 둘다
						  .context(plannerTextDTO.getContext())
						  .build();
	}
	
}