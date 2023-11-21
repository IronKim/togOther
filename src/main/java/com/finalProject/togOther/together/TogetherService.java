package com.finalProject.togOther.together;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.TogetherDTO;

public interface TogetherService {

	public ResponseEntity<Integer> addTogether(TogetherDTO togetherDTO);

	public ResponseEntity<List<TogetherDTO>> getTogetherList();

	public ResponseEntity<List<SubItemDTO>> getSubItemList();

	public ResponseEntity<List<CustomPlaceDTO>> getCustomList();


}
