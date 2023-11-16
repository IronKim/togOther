package com.finalProject.togOther.dto;


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
public class SubItemDTO {
	private int subSeq;
	private int plMainSeq;
	private int toMainSeq;
	private int nday;
	private int code; //0 플래너 1 동행 2 둘다
	private int startTime;
	private int endTime;
	private String context;
	private int placeSw;//0 장소 검색 (placeSeq) 1 장소 커스텀 (pCustomSeq)
	private int placeSeq;
	private int pCustomSeq;	
	
	public static SubItemDTO toDTO(SubItem subItem) {
		
		return SubItemDTO.builder()
				.subSeq(subItem.getSubSeq())
				.plMainSeq(subItem.getPlMainSeq())
				.toMainSeq(subItem.getToMainSeq())
				.nday(subItem.getNday())
				.code(subItem.getCode()) //0 플래너 1 동행 2 둘다
				.startTime(subItem.getStartTime())
				.endTime(subItem.getEndTime())
				.context(subItem.getContext())
				.placeSw(subItem.getPlaceSw())//0 장소 검색 (placeSeq) 1 장소 커스텀 (pCustomSeq)
				.placeSeq(subItem.getPlaceSeq())
				.pCustomSeq(subItem.getPCustomSeq())	
				.build();
	}
	
}
