package com.finalProject.togOther.dto;

import java.util.List;

import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.PlaceReview;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PlaceDTO {

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
	//댓글개수
	private int reviewCnt;
	
	public static PlaceDTO toDTO(Place place) {
		return PlaceDTO.builder()
					   .placeSeq(place.getPlaceSeq())
					   .citySeq(place.getCitySeq())
					   .code(place.getCode())
					   .name(place.getName())
				   	   .address(place.getAddress())
					   .longitude(place.getLongitude())
					   .latitude(place.getLatitude())
					   .image(place.getImage())
					   .subImage1(place.getSubImage1())
					   .subImage2(place.getSubImage2())
					   .context1(place.getContext1())
					   .context2(place.getContext2())
					   .context3(place.getContext3())
					   .likeCnt(place.getLikeCnt())
					   .tag(place.getTag())
					   .reviewCnt(place.getReviewCnt())
					   .build();
	}
}
