package com.finalProject.togOther.dto;

import java.sql.Timestamp;


import com.finalProject.togOther.domain.Planner;


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
public class PlannerDTO {
	private int plannerSeq;
	private int citySeq;
	private int userSeq;
    private String useremail;
    private String userid;
    private String userName;
    private String userGender;
    private String userProfileImage;
	private String title;
	private String startDate;
	private String endDate;
	private Timestamp logTime;
	private int hit;
	private int likeCnt;
	private byte publicPlan;
	
	
	public static PlannerDTO toDTO(Planner planner) {
		
		return PlannerDTO.builder()
						 .plannerSeq(planner.getPlannerSeq())
						 .citySeq(planner.getCitySeq())
						 .userSeq(planner.getUserSeq())
		                 .useremail(planner.getUseremail())
		                 .userid(planner.getUserid())
		                 .userName(planner.getUserName())
		                 .userGender(planner.getUserGender())
		                 .userProfileImage(planner.getUserProfileImage())
						 .title(planner.getTitle())
						 .startDate(planner.getStartDate())
						 .endDate(planner.getEndDate())
						 .logTime(planner.getLogTime())
						 .hit(planner.getHit())
						 .likeCnt(planner.getLikeCnt())
						 .publicPlan(planner.getPublicPlan())
						 .build();
	}
	
}
