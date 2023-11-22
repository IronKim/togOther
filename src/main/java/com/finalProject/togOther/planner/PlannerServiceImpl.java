package com.finalProject.togOther.planner;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.finalProject.togOther.domain.City;
import com.finalProject.togOther.domain.Planner;
import com.finalProject.togOther.domain.PlannerImage;
import com.finalProject.togOther.domain.PlannerText;
import com.finalProject.togOther.domain.SubItem;
import com.finalProject.togOther.dto.CityDTO;
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
//플래너 리스트 20개 + 20개 + 20개... 으로 불러오기
	@Override
	public ResponseEntity<List<PlannerDTO>> getPlanner(int n,String search) {
		try {
			Pageable pageable = PageRequest.of(0, n);
			
			
			List<Planner> plannerList = 
				plannerRepository.findAllByTitleContainingOrderByLogTimeDesc(pageable,search);

			List<PlannerDTO> plannerDTOList = new ArrayList<PlannerDTO>();

			for (Planner planner : plannerList) {

				PlannerDTO plannerDTO = PlannerDTO.toDTO(planner);

				plannerDTOList.add(plannerDTO);
			}

			return ResponseEntity.ok(plannerDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
//플래너 리스트 전체 개수 불러오기
	@Override
	public ResponseEntity<Integer> totPlanner(String search) {
		try {
			int total = (int) plannerRepository.countByTitleContaining(search);
			
			return ResponseEntity.ok(total);
			
		} catch (Exception e) {
			return ResponseEntity.ok(-1);
		}
	}

	@Override
	public ResponseEntity<List<PlannerImageDTO>> getImages(int n) {
		try {
			
			List<PlannerImage> plannerImageList = plannerImageRepository.findByPlMainSeqBetween(0,n);

			List<PlannerImageDTO> plannerImageDTOList = new ArrayList<PlannerImageDTO>();

			for (PlannerImage plannerImage : plannerImageList) {

				PlannerImageDTO plannerImageDTO = PlannerImageDTO.toDTO(plannerImage);

				plannerImageDTOList.add(plannerImageDTO);
			}

			return ResponseEntity.ok(plannerImageDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
