package com.finalProject.togOther.planner;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;

public interface PlannerService {

	public ResponseEntity<Integer> addPlanner(PlannerDTO plannerDTO);

	public ResponseEntity<String> addSubItem(SubItemDTO subItemDTO);

	public ResponseEntity<String> addPlannerText(PlannerTextDTO plannerTextDTO);

	public ResponseEntity<String> addPlannerImage(PlannerImageDTO plannerImageDTO);

	public ResponseEntity<List<PlannerDTO>> getPlanner(int n,String search);

	public ResponseEntity<Integer> totPlanner(String search);

	public ResponseEntity<List<PlannerImageDTO>> getImages(int n);

	public ResponseEntity<Map<String, Object>> getPlannerView(int plannerSeq);

	public ResponseEntity<String> deletePlanner(int seq);

	public ResponseEntity<List<PlannerDTO>> getMyPlanner(int n, int userSeq);

	public ResponseEntity<Integer> totMyPlanner(int userSeq);

	public ResponseEntity<String> updatePublicPlan(int plannerSeq, int plan);

	public ResponseEntity<List<PlannerDTO>> getAllPlanner();
}
