package com.finalProject.togOther.domain;



import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.finalProject.togOther.dto.PlaceReviewDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class PlaceReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewSeq;  //--리뷰 번호
	private int placeSeq;   //- 장소번호
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_seq")
	private User user; //-- 유저 번호 (사진 이름)
	
	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp date;  //--날짜
	private String context;  //-- 글 내용
	private String image;    //-- 이미지 --->  몇개까지?   // 텍스트로 해서 배열로
	
	public static PlaceReview toEntity(PlaceReviewDTO placeReviewDTO) {
		return PlaceReview.builder()
						  .reviewSeq(placeReviewDTO.getReviewSeq())
						  .placeSeq(placeReviewDTO.getPlaceSeq())
						  .user(placeReviewDTO.getUser())
						  .date(placeReviewDTO.getDate())
						  .context(placeReviewDTO.getContext())
						  .image(placeReviewDTO.getImage())
						  .build();
	}	
}
