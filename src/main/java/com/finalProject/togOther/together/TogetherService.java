package com.finalProject.togOther.together;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.TogetherDTO;

public interface TogetherService {

	ResponseEntity<Integer> addTogether(TogetherDTO togetherDTO);

}
