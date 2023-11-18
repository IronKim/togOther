package com.finalProject.togOther.dto;

import com.finalProject.togOther.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginInResponseDTO {

	private String token;
	private int exprTime;
	private User user;
}
