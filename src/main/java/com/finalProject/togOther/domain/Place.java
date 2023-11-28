package com.finalProject.togOther.domain;

import java.util.List;

import com.finalProject.togOther.dto.PlaceDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
public class Place {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int placeSeq;
	
	private int citySeq;
	
	//장소 분류코드
	private int code;
	//장소 이름
	private String name;
	//장소 주소
	private String address;
	//장소 경도
	private String longitude;
	//장소 위도
	private String latitude;
	//이미지
	private String image;
	//서브 이미지1
	private String subImage1;
	//서브 이미지2
	private String subImage2;
	//설명
	private String context1;
	//설명2
	private String context2;
	//설명3
	private String context3;
	//좋아요
	private int likeCnt;
	//태그 
	private String tag;
		
	public static Place toEntity(PlaceDTO placeDTO) {
		return Place.builder()
					.placeSeq(placeDTO.getPlaceSeq())
					.citySeq(placeDTO.getCitySeq())
					.code(placeDTO.getCode())
					.name(placeDTO.getName())
					.address(placeDTO.getAddress())
					.longitude(placeDTO.getLongitude())
					.latitude(placeDTO.getLatitude())
					.image(placeDTO.getImage())
					.subImage1(placeDTO.getSubImage1())
					.subImage2(placeDTO.getSubImage2())
					.context1(placeDTO.getContext1())
					.context2(placeDTO.getContext2())
					.context3(placeDTO.getContext3())
					.likeCnt(placeDTO.getLikeCnt())
					.tag(placeDTO.getTag())
					.build();
	}
	
}
