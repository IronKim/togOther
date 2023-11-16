package com.finalProject.togOther.dto;

import java.sql.Timestamp;

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
public class PlaceReviewDTO {
	private int reviewSeq;  //--리뷰 번호
	private int placeSeq;   //- 장소번호
	private int userSeq; //-- 유저 번호 (사진 이름)
	private Timestamp date;  //--날짜
	private String context;  //-- 글 내용
	private String image;    //-- 이미지 --->  몇개까지?   // 텍스트로 해서 배열로


	public static PlaceReviewDTO toDTO(PlaceReview placeReview) {
		return PlaceReviewDTO.builder()
				.reviewSeq(placeReview.getReviewSeq())
				.placeSeq(placeReview.getPlaceSeq())
				.userSeq(placeReview.getUserSeq())
				.date(placeReview.getDate())
				.context(placeReview.getContext())
				.image(placeReview.getImage())
				.build();
	}
}