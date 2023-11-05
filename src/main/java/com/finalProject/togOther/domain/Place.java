package com.finalProject.togOther.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "place")
@Getter
@Setter
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
}
