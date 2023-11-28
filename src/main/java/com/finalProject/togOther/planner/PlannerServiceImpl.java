package com.finalProject.togOther.planner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.PlannerImageDTO;
import com.finalProject.togOther.dto.PlannerTextDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.UserDTO;
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
				plannerRepository.findAllByTitleContainingAndPublicPlanOrderByPlannerSeqDesc(pageable,search,0);

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
			int total = (int) plannerRepository.countByTitleContainingAndPublicPlan(search,0);
			
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

	@Override
	public ResponseEntity<Map<String, Object>> getPlannerView(int plannerSeq) {
		try {
			
			Planner planner = plannerRepository.findOneByPlannerSeq(plannerSeq);
			List<PlannerImage> plannerImageList = plannerImageRepository.findByPlMainSeq(plannerSeq);
			List<PlannerText> plannerTextList = plannerTextRepository.findByPlMainSeq(plannerSeq);
			List<SubItem> subItemList = subItemRepository.findByPlMainSeq(plannerSeq);

			Map<String, Object> planners = new HashMap<String, Object>();

			List<PlannerImageDTO> plannerImageDTOList = new ArrayList<PlannerImageDTO>();
			List<PlannerTextDTO> plannerTextDTOList = new ArrayList<PlannerTextDTO>();
			List<SubItemDTO> subItemDTOList = new ArrayList<SubItemDTO>();
			
			PlannerDTO plannerDTO = PlannerDTO.toDTO(planner);
			
			for (PlannerImage plannerImage : plannerImageList) {
				
				PlannerImageDTO plannerImageDTO = PlannerImageDTO.toDTO(plannerImage);
				
				plannerImageDTOList.add(plannerImageDTO);
			}
			for (PlannerText plannerText : plannerTextList) {
				
				PlannerTextDTO plannerTextDTO = PlannerTextDTO.toDTO(plannerText);
				
				plannerTextDTOList.add(plannerTextDTO);
			}
			for (SubItem subItem : subItemList) {
				
				SubItemDTO subItemDTO = SubItemDTO.toDTO(subItem);
				
				subItemDTOList.add(subItemDTO);
			}
			
			planners.put("planner", plannerDTO);
			planners.put("plannerImage", plannerImageDTOList);
			planners.put("plannerText", plannerTextDTOList);
			planners.put("subItem", subItemDTOList);
			
			return ResponseEntity.ok(planners);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<String> deletePlanner(int seq) {
		try {
			plannerRepository.deleteById(seq);
			plannerTextRepository.deleteByPlMainSeq(seq);
			plannerImageRepository.deleteByPlMainSeq(seq);

			// 사용자가 성공적으로 삭제되었을 때
			String responseMessage = "플래너가 삭제되었습니다.";
			return ResponseEntity.ok(responseMessage);
		} catch (Exception e) {

			// 사용자 삭제 중 에러가 발생했을 때
			String errorMessage = "플래너 삭제 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	//개인!!!!!!!!! 플래너 리스트 20개 + 20개 + 20개... 으로 불러오기
		@Override
		public ResponseEntity<List<PlannerDTO>> getMyPlanner(int n,int userSeq) {
			try {
				Pageable pageable = PageRequest.of(0, n);
				
				
				List<Planner> plannerList = 
					plannerRepository.findAllByUserSeqOrderByPlannerSeqDesc(pageable,userSeq);

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
	//개인!!!!!!!!! 플래너 리스트 전체 개수 불러오기
		@Override
		public ResponseEntity<Integer> totMyPlanner(int userSeq) {
			try {
				int total = (int) plannerRepository.countByUserSeq(userSeq);
				
				return ResponseEntity.ok(total);
				
			} catch (Exception e) {
				return ResponseEntity.ok(-1);
			}
		}
		//플래너 전체 개수 불러오기
		@Override
		public ResponseEntity<List<PlannerDTO>> getAllPlanner() {
			try {
				List<Planner> plannerList = plannerRepository.findAll();
				
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
		//공개여부 수정
		@Override
		public ResponseEntity<String> updatePublicPlan(int plannerSeq, int plan) {
			
			try {
				
				Optional<Planner> optionalPlanner = plannerRepository.findById(plannerSeq);
				
				Planner planner = optionalPlanner.orElseThrow();
				
				PlannerDTO plannerDTO = PlannerDTO.toDTO(planner);
				
				plannerDTO.setPublicPlan((byte)plan);
				
				plannerRepository.save(Planner.toEntity(plannerDTO));
				
				String responseMessage = "성공적으로 수정하였습니다.";
				return ResponseEntity.ok(responseMessage);
				
			} catch (Exception e) {
				
				String errorMessage = "수정 중 오류가 발생했습니다.";
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
			}
		}
}
