package com.finalProject.togOther.together;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.TogetherDTO;

public interface TogetherService {

	public ResponseEntity<Integer> addTogether(TogetherDTO togetherDTO);

	public ResponseEntity<List<TogetherDTO>> getTogetherList(int n,String search);

	public ResponseEntity<List<SubItemDTO>> getSubItemList();

	public ResponseEntity<List<CustomPlaceDTO>> getCustomList();

	public ResponseEntity<Integer> totTogether(String search);

	public ResponseEntity<Map<String, Object>> getTogetherSeq(int togetherSeq);

	public ResponseEntity<List<TogetherDTO>> getMyTogetherList(int n, int userSeq);

	public ResponseEntity<Integer> totMyTogether(int userSeq);




}
