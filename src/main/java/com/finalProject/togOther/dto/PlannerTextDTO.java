package com.finalProject.togOther.dto;


import com.finalProject.togOther.domain.PlannerText;
import com.finalProject.togOther.domain.SubItem;

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
public class PlannerTextDTO {
	private int plTextSeq;
	private int plMainSeq;
	private String id;
	private int nday;
	private int orders;
	private String context;
	
	public static PlannerTextDTO toDTO(PlannerText plannerText) {
		
		return PlannerTextDTO.builder()
				.plTextSeq(plannerText.getPlTextSeq())
				.plMainSeq(plannerText.getPlMainSeq())
				.id(plannerText.getId())
				.nday(plannerText.getNday())
				.orders(plannerText.getOrders()) //0 플래너 1 동행 2 둘다
				.context(plannerText.getContext())
				.build();
	}
	
}
//CREATE TABLE `planerText` (
//		`plTextSeq`	int	NOT NULL,
//		`plMainSeq`	int	NOT NULL,
//		`id`	string	NOT NULL,
//		`nday`	date	NOT NULL,
//		`order`	int	NOT NULL,
//		`context`	text	NULL
//	);