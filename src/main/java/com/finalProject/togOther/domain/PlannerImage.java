package com.finalProject.togOther.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.constant.Continent;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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