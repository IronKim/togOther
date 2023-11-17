package com.finalProject.togOther.planner;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;

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

}
