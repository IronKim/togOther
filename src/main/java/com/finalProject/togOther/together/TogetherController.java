package com.finalProject.togOther.together;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.domain.CreateRoom;
import com.finalProject.togOther.domain.Subscript;
import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.SubscriptDTO;
import com.finalProject.togOther.dto.TogetherDTO;

@RestController
@RequestMapping("api/together")
public class TogetherController {

	private TogetherService togetherService;

	public TogetherController(TogetherService togetherService) {
		this.togetherService = togetherService;
	}
	//동행 추가
	@PostMapping(path = "addTogether")
	public ResponseEntity<Integer> addTogether(@RequestBody TogetherDTO togetherDTO) {
		return togetherService.addTogether(togetherDTO);
	}
	
	//동행 리스트 불러오기
	@PostMapping(path="getTogetherList")
	public ResponseEntity<List<TogetherDTO>> getTogetherList(@RequestBody Map<String, String> requestBody) {
	    int n = Integer.parseInt(requestBody.get("n"));
	    String search = requestBody.get("search");
		return togetherService.getTogetherList(n,search);
	}
	// 토탈 불러오기
	@PostMapping(path = "totTogether")
	public ResponseEntity<Integer> totTogether(@RequestBody Map<String, String> requestBody) {
		String search = requestBody.get("search");
		return togetherService.totTogether(search);
	}
	// 개인 리스트 불러오기
	@PostMapping(path = "getMyTogetherList")
	public ResponseEntity<List<TogetherDTO>> getMyTogetherList(@RequestBody Map<String, Integer> requestBody) {
		int n = requestBody.get("n");
		int userSeq = requestBody.get("userSeq");
		return togetherService.getMyTogetherList(n,userSeq);
	}
	
	// 개인 토탈 불러오기
	@PostMapping(path = "totMyTogether")
	public ResponseEntity<Integer> totMyTogether(@RequestBody Map<String, Integer> requestBody) {
		int userSeq = requestBody.get("userSeq");
		return togetherService.totMyTogether(userSeq);
	}
	
	//서브아이템 리스트 불러오기
	@GetMapping(path="getSubItemList")
	public ResponseEntity<List<SubItemDTO>> getSubItemList(){
		return togetherService.getSubItemList();
	}
	
	//커스텀 리스트 불러오기
	@GetMapping(path="getCustomList")
	public ResponseEntity<List<CustomPlaceDTO>> getCustomList(){
		return togetherService.getCustomList();
	}
	
	//togetherSeq에 해당하는 togetherDTO 불러오기
	@GetMapping(path="getTogetherSeq/{togetherSeq}")
	public ResponseEntity<Map<String, Object>> getTogetherSeq(@PathVariable int togetherSeq){
		return togetherService.getTogetherSeq(togetherSeq);
	}

	//동행 삭제
	@DeleteMapping(path = "deleteTogether/{togetherSeq}")
	public ResponseEntity<String> deleteTogether(@PathVariable int togetherSeq) {
	    return togetherService.deleteTogether(togetherSeq);
	}
	
	//togetherSeq에 해당하는 togetherDTO 불러오기
	@GetMapping(path="getAllTogether")
	public ResponseEntity<List<TogetherDTO>> getAllTogether(){
		return togetherService.getAllTogether();
	}
		
	//신청 추가
	@PostMapping(path = "addSubscript")
	public ResponseEntity<Integer> addSubscript(@RequestBody SubscriptDTO subscriptDTO) {
		return togetherService.addSubscript(subscriptDTO);
	}
	//신청 시퀀스 가져오기
	@GetMapping(path = "getChatSeq/{togetherSeq}")
	public ResponseEntity<CreateRoom> getChatSeq(@PathVariable int togetherSeq) {
		return togetherService.getChatSeq(togetherSeq);
	}
	
	//신청 시퀀스 가져오기
	@GetMapping(path = "getAllSubscript")
	public ResponseEntity<List<SubscriptDTO>> getAllSubscript() {
		return togetherService.getAllSubscript();
	}
	
	//신청 시퀀스 가져오기
	@DeleteMapping(path = "deleteSubscript/{subscriptSeq}")
	public ResponseEntity<String> deleteSubscript(@PathVariable int subscriptSeq) {
		return togetherService.deleteSubscript(subscriptSeq);
	}
}
