package com.finalProject.togOther.dto;


import com.finalProject.togOther.domain.Subscript;

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
public class SubscriptDTO {
	
	private int subscriptSeq;
	private int toMainSeq;
	private int chatSeq;
	private int userSeq;
	private int masterSeq;
	private int sw;
	private String context;
	
	
	public static SubscriptDTO toDTO(Subscript subscript) {
		
		return SubscriptDTO.builder()
							  .subscriptSeq(subscript.getSubscriptSeq())
							  .toMainSeq(subscript.getToMainSeq())
							  .chatSeq(subscript.getChatSeq())
							  .context(subscript.getContext())
							  .userSeq(subscript.getUserSeq())
							  .masterSeq(subscript.getMasterSeq())
							  .sw(subscript.getSw())
							  .build();
	}
	
	
}