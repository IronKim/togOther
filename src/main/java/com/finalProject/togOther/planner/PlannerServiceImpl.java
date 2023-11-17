package com.finalProject.togOther.planner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.Planner;
import com.finalProject.togOther.domain.PlannerImage;
import com.finalProject.togOther.domain.PlannerText;
import com.finalProject.togOther.domain.SubItem;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.repository.PlannerImageRepository;
import com.finalProject.togOther.repository.PlannerRepository;
import com.finalProject.togOther.repository.PlannerTextRepository;
import com.finalProject.togOther.repository.SubItemRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PlannerServiceImpl implements PlannerService {

	private PlannerRepository plannerRepository;
	private SubItemRepository subItemRepository;
	private PlannerTextRepository plannerTextRepository;
	private PlannerImageRepository plannerImageRepository;

	public PlannerServiceImpl(PlannerRepository plannerRepository, SubItemRepository subItemRepository,
			PlannerTextRepository plannerTextRepository, PlannerImageRepository plannerImageRepository) {
		this.plannerRepository = plannerRepository;
		this.subItemRepository = subItemRepository;
		this.plannerTextRepository = plannerTextRepository;
		this.plannerImageRepository = plannerImageRepository;
	}

	@Override
	public ResponseEntity<Integer> addPlanner(PlannerDTO plannerDTO) {
		Planner planner = Planner.toEntity(plannerDTO);

		try {
			plannerRepository.save(planner);

			int plannerSeq = planner.getPlannerSeq();

			return ResponseEntity.ok(plannerSeq);

		} catch (Exception e) {

			return ResponseEntity.ok(-1);
		}
	}

	@Override
	public ResponseEntity<String> addSubItem(SubItemDTO subItemDTO) {
		SubItem subItem = SubItem.toEntity(subItemDTO);

		try {
			subItemRepository.save(subItem);

			String responseMessage = "추가되었습니다.";

			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	@Override
	public ResponseEntity<String> addPlannerText(PlannerTextDTO plannerTextDTO) {
		PlannerText plannerText = PlannerText.toEntity(plannerTextDTO);

		try {
			plannerTextRepository.save(plannerText);

			String responseMessage = "추가되었습니다.";

			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	@Override
	public ResponseEntity<String> addPlannerImage(PlannerImageDTO plannerImageDTO) {
		PlannerImage plannerImage = PlannerImage.toEntity(plannerImageDTO);

		try {
			plannerImageRepository.save(plannerImage);

			String responseMessage = "추가되었습니다.";

			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
}
