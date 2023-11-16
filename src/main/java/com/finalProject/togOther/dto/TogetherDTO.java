package com.finalProject.togOther.dto;

import java.util.Date;

import com.finalProject.togOther.domain.Together;

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
public class TogetherDTO {
	private int togetherSeq;
	private int userSeq;
	private String title;
	private Date startDate;
	private Date endDate;
	private String context;
	private int tnum;
	
	public static TogetherDTO toDTO(Together together) {
		
		return TogetherDTO.builder()
				.togetherSeq(together.getTogetherSeq())
				   .userSeq(together.getUserSeq())
				   .title(together.getTitle())
				   .startDate(together.getStartDate())
				   .endDate(together.getEndDate())
				   .context(together.getContext())
				   .tnum(together.getTnum())
				   .build();
	}

}
