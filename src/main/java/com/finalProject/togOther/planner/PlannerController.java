package com.finalProject.togOther.planner;

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

import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.UserDTO;

//플래너 컨트롤러
@RestController
@RequestMapping("api/planner")
public class PlannerController {

	private PlannerService plannerService;

	public PlannerController(PlannerService plannerService) {
		this.plannerService = plannerService;
	}

	@PostMapping(path = "addPlanner")
	public ResponseEntity<Integer> addPlanner(@RequestBody PlannerDTO plannerDTO) {
		return plannerService.addPlanner(plannerDTO);
	}

	@PostMapping(path = "addSubItem")
	public ResponseEntity<String> addSubItem(@RequestBody SubItemDTO subItemDTO) {
		return plannerService.addSubItem(subItemDTO);
	}

	@PostMapping(path = "addPlannerText")
	public ResponseEntity<String> addPlannerText(@RequestBody PlannerTextDTO plannerTextDTO) {
		return plannerService.addPlannerText(plannerTextDTO);
	}

	@PostMapping(path = "addPlannerImage")
	public ResponseEntity<String> addPlannerImage(@RequestBody PlannerImageDTO plannerImageDTO) {
		return plannerService.addPlannerImage(plannerImageDTO);
	}

	// 리스트 불러오기
	@PostMapping(path = "getPlanner")
	public ResponseEntity<List<PlannerDTO>> getPlanner(@RequestBody Map<String, String> requestBody) {
	    int n = Integer.parseInt(requestBody.get("n"));
	    String search = requestBody.get("search");
		return plannerService.getPlanner(n,search);
	}
	
	// 토탈 불러오기
	@PostMapping(path = "totPlanner")
	public ResponseEntity<Integer> totPlanner(@RequestBody Map<String, String> requestBody) {
		String search = requestBody.get("search");
		return plannerService.totPlanner(search);
	}
	
	// 개인 리스트 불러오기
	@PostMapping(path = "getMyPlanner")
	public ResponseEntity<List<PlannerDTO>> getMyPlanner(@RequestBody Map<String, Integer> requestBody) {
		int n = requestBody.get("n");
		int userSeq = requestBody.get("userSeq");
		return plannerService.getMyPlanner(n,userSeq);
	}
	
	// 개인 토탈 불러오기
	@PostMapping(path = "totMyPlanner")
	public ResponseEntity<Integer> totMyPlanner(@RequestBody Map<String, Integer> requestBody) {
		int userSeq = requestBody.get("userSeq");
		return plannerService.totMyPlanner(userSeq);
	}
	
	//이미지 리스트 불러오기
	// 리스트 불러오기
	@PostMapping(path = "getImages")
	public ResponseEntity<List<PlannerImageDTO>> getImages(@RequestBody Map<String, Integer> requestBody) {
	    int n = requestBody.get("n");
		return plannerService.getImages(n);
	}
	
	//seq로 데이터 불러오기
	@GetMapping(path = "getPlannerView/{plannerSeq}")
	public ResponseEntity<Map<String, Object>> getPlanner(@PathVariable int plannerSeq) {
		return plannerService.getPlannerView(plannerSeq);
	}
	
	// 플래너 삭제
	@DeleteMapping(path = "deletePlanner/{seq}")
	public ResponseEntity<String> deletePlanner(@PathVariable int seq) {
		return plannerService.deletePlanner(seq);
	}
	
	// 플래너 공개여부 수정
	@PutMapping(path = "updatePublicPlan/{plannerSeq}")
	public ResponseEntity<String> updatePublicPlan(@PathVariable int plannerSeq, 
			@RequestBody Map<String,Integer> requestBody) {
		int plan = requestBody.get("plan");
		return plannerService.updatePublicPlan(plannerSeq, plan);
	}
}
