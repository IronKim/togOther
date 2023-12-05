package com.finalProject.togOther.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import com.finalProject.togOther.domain.Together;

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
public class TogetherDTO {
	private int togetherSeq;
	private int userSeq;
	private String useremail;
	private String userid;
	private String userName;
	private String userGender;
	private String userProfileImage;
	private byte code;
	private String title;
	private LocalDate startDate;
	private LocalDate endDate;
	private String context;
	private int tnum;
	private Timestamp logTime;
	
	public static TogetherDTO toDTO(Together together) {
		
		return TogetherDTO.builder()
						  .togetherSeq(together.getTogetherSeq())
						  .userSeq(together.getUserSeq())
						  .useremail(together.getUseremail())
						  .userid(together.getUserid())
					      .userName(together.getUserName())
					      .userGender(together.getUserGender())
					      .userProfileImage(together.getUserProfileImage())
					      .code(together.getCode())
					      .title(together.getTitle())
					      .startDate(together.getStartDate())
					      .endDate(together.getEndDate())
					      .context(together.getContext())
					      .tnum(together.getTnum())
					      .logTime(together.getLogTime())
					      .build();
	}

}
