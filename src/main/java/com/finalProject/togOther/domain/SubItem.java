package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.SubItemDTO;

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
public class SubItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int subSeq;
	private int plMainSeq;
	private int toMainSeq;
	private int nday;
	private byte code; //0 플래너 1 동행 2 둘다
	private int startTime;
	private int endTime;
	private String context;
	private byte placeSw;//0 장소 검색 (placeSeq) 1 장소 커스텀 (pCustomSeq)
	private int placeSeq;
	private int plCustomSeq;	
	
	
	public static SubItem toEntity(SubItemDTO subItemDTO) {
		
		return SubItem.builder()
					  .subSeq(subItemDTO.getSubSeq())
					  .plMainSeq(subItemDTO.getPlMainSeq())
					  .toMainSeq(subItemDTO.getToMainSeq())
				  	  .nday(subItemDTO.getNday())
					  .code(subItemDTO.getCode()) //0 플래너 1 동행 2 둘다
					  .startTime(subItemDTO.getStartTime())
					  .endTime(subItemDTO.getEndTime())
					  .context(subItemDTO.getContext())
					  .placeSw(subItemDTO.getPlaceSw())//0 장소 검색 (placeSeq) 1 장소 커스텀 (pCustomSeq)
					  .placeSeq(subItemDTO.getPlaceSeq())
					  .plCustomSeq(subItemDTO.getPlCustomSeq())	
					  .build();
	}
	
}