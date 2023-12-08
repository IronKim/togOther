package com.finalProject.togOther.domain;

import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.SubscriptDTO;

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
public class Subscript {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int subscriptSeq;
	private int toMainSeq;
	private int chatSeq;
	private int userSeq;
	private int masterSeq;
	private int sw;
	@Column(columnDefinition = "TEXT")
	private String context;
	
	public static Subscript toEntity(SubscriptDTO subscriptDTO) {
		
		return Subscript.builder()
						  .subscriptSeq(subscriptDTO.getSubscriptSeq())
						  .toMainSeq(subscriptDTO.getToMainSeq())
						  .chatSeq(subscriptDTO.getChatSeq())
						  .context(subscriptDTO.getContext())
						  .userSeq(subscriptDTO.getUserSeq())
						  .masterSeq(subscriptDTO.getMasterSeq())
						  .sw(subscriptDTO.getSw())
						  .build();
	}
	
}