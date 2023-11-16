package com.finalProject.togOther.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.constant.Continent;
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
public class PlannerText {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plTextSeq;
	private int plMainSeq;
	private String id; //0 플래너 1 동행 2 둘다
	private int nday;
	private int orders;
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