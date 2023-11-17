package com.finalProject.togOther.domain;

import java.time.LocalDate;

import com.finalProject.togOther.dto.TogetherDTO;

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
public class Together {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int togetherSeq;
	private int userSeq;
	private String title;
	private LocalDate startDate;
	private LocalDate endDate;
	private String context;
	private int tnum;
	
	public static Together toEntity(TogetherDTO togetherDTO) {
		return Together.builder()
					   .togetherSeq(togetherDTO.getTogetherSeq())
					   .userSeq(togetherDTO.getUserSeq())
					   .title(togetherDTO.getTitle())
					   .startDate(togetherDTO.getStartDate())
					   .endDate(togetherDTO.getEndDate())
					   .context(togetherDTO.getContext())
					   .tnum(togetherDTO.getTnum())
					   .build();
	}

}
