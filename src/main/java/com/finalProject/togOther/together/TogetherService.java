package com.finalProject.togOther.together;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.TogetherDTO;

public interface TogetherService {

	public ResponseEntity<Integer> addTogether(TogetherDTO togetherDTO);

	public ResponseEntity<List<TogetherDTO>> getTogetherList(int n);

	public ResponseEntity<List<SubItemDTO>> getSubItemList();

	public ResponseEntity<List<CustomPlaceDTO>> getCustomList();

	public ResponseEntity<Integer> totTogether();

	public ResponseEntity<TogetherDTO> getTogetherSeq(int togetherSeq);

	public ResponseEntity<SubItemDTO> getTogetherBySub(int togetherSeq);



}
