package com.finalProject.togOther.together;

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

import com.finalProject.togOther.domain.CustomPlace;
import com.finalProject.togOther.domain.Planner;
import com.finalProject.togOther.domain.SubItem;
import com.finalProject.togOther.domain.Together;
import com.finalProject.togOther.dto.CustomPlaceDTO;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.SubItemDTO;
import com.finalProject.togOther.dto.TogetherDTO;
import com.finalProject.togOther.repository.CityRepository;
import com.finalProject.togOther.repository.CustomPlaceRepository;
import com.finalProject.togOther.repository.PlaceRepository;
import com.finalProject.togOther.repository.SubItemRepository;
import com.finalProject.togOther.repository.TogetherRepository;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TogetherServiceImpl implements TogetherService {

	private CityRepository cityRepository;
	private PlaceRepository placeRepository;
	private UserRepository userRepository;
	private TogetherRepository togetherRepository;
	private SubItemRepository subItemRepository;
	private CustomPlaceRepository customPlaceRepository;

	public TogetherServiceImpl(CityRepository cityRepository, PlaceRepository placeRepository,
			UserRepository userRepository, TogetherRepository togetherRepository, SubItemRepository subItemRepository,
			CustomPlaceRepository customPlaceRepository) {
		this.cityRepository = cityRepository;
		this.placeRepository = placeRepository;
		this.userRepository = userRepository;
		this.togetherRepository = togetherRepository;
		this.subItemRepository = subItemRepository;
		this.customPlaceRepository = customPlaceRepository;
	}

	@Override
	public ResponseEntity<Integer> addTogether(TogetherDTO togetherDTO) {

		Together together = Together.toEntity(togetherDTO);
		try {
			togetherRepository.save(together);
			
			int togetherSeq = together.getTogetherSeq();
			
			return ResponseEntity.ok(togetherSeq);
			
		} catch (Exception e) {
			
			return ResponseEntity.ok(-1);
			
		}
		
	}

	@Override
	public ResponseEntity<List<TogetherDTO>> getTogetherList(int n,String search) {
		try {
			Pageable pageable = PageRequest.of(0, n);
			
			System.out.println(n);
			
			List<Together> togetherList = 
					togetherRepository.findAllByTitleContainingOrContextContainingOrderByTogetherSeqDesc(pageable,search,search);

			List<TogetherDTO> togetherDTOList = new ArrayList<TogetherDTO>();
			
			for (Together together : togetherList) {
				TogetherDTO togetherDTO = TogetherDTO.toDTO(together);
				
				togetherDTOList.add(togetherDTO);
			}
			return ResponseEntity.ok(togetherDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<List<SubItemDTO>> getSubItemList() {
		try {
			
			List<SubItem> subItemList = subItemRepository.findAll();
			
			List<SubItemDTO> subItemDTOList = new ArrayList<SubItemDTO>();
			
			for (SubItem subItem : subItemList) {
				SubItemDTO subItemDTO = SubItemDTO.toDTO(subItem);
				
				subItemDTOList.add(subItemDTO);
			}
			return ResponseEntity.ok(subItemDTOList);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@Override
	public ResponseEntity<List<CustomPlaceDTO>> getCustomList() {
		try {
			
			List<CustomPlace> customPlaceList = customPlaceRepository.findAll();
			
			List<CustomPlaceDTO> customPlaceDOTList = new ArrayList<CustomPlaceDTO>();
			
			for (CustomPlace customPlace : customPlaceList) {
				CustomPlaceDTO customPlaceDTO = CustomPlaceDTO.toDTO(customPlace);
				
				customPlaceDOTList.add(customPlaceDTO);
			}
			return ResponseEntity.ok(customPlaceDOTList);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@Override
	public ResponseEntity<Integer> totTogether(String search) {
		try {
			int total = (int) togetherRepository.countByTitleContainingOrContextContaining(search,search);
			
			return ResponseEntity.ok(total);
			
		} catch (Exception e) {
			return ResponseEntity.ok(-1);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> getTogetherSeq(int togetherSeq) {
		try {
			
			Map<String, Object> togethers = new HashMap<String, Object>();
			
			Together together = togetherRepository.findOneByTogetherSeq(togetherSeq);
			TogetherDTO togetherDTO = TogetherDTO.toDTO(together);
			
			List<SubItem> subItemList = subItemRepository.findByToMainSeq(togetherSeq);
			List<SubItemDTO> subItemDTOList = new ArrayList<SubItemDTO>();
			
			for (SubItem subItem : subItemList) {
				
				SubItemDTO subItemDTO = SubItemDTO.toDTO(subItem);
				
				subItemDTOList.add(subItemDTO);
			}
			
			togethers.put("together", togetherDTO);
			togethers.put("subItem", subItemDTOList);
			
			return ResponseEntity.ok(togethers);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	//개인!!!!!!!!! 플래너 리스트 20개 + 20개 + 20개... 으로 불러오기
	@Override
	public ResponseEntity<List<TogetherDTO>> getMyTogetherList(int n,int userSeq) {
		try {
			Pageable pageable = PageRequest.of(0, n);
			
			
			List<Together> togetherList = 
				togetherRepository.findAllByUserSeqOrderByTogetherSeqDesc(pageable, userSeq);

			List<TogetherDTO> togetherDTOList = new ArrayList<TogetherDTO>();

			for (Together together : togetherList) {

				TogetherDTO togetherDTO = TogetherDTO.toDTO(together);

				togetherDTOList.add(togetherDTO);
			}

			return ResponseEntity.ok(togetherDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
//개인!!!!!!!!! 플래너 리스트 전체 개수 불러오기
	@Override
	public ResponseEntity<Integer> totMyTogether(int userSeq) {
		try {
			int total = (int) togetherRepository.countByUserSeq(userSeq);
			
			return ResponseEntity.ok(total);
			
		} catch (Exception e) {
			return ResponseEntity.ok(-1);
		}
	}

	@Override
	public ResponseEntity<String> deleteTogether(int togetherSeq) {
		try {
			togetherRepository.deleteById(togetherSeq);

			// 사용자가 성공적으로 삭제되었을 때
			String responseMessage = "동행이 삭제되었습니다.";
			return ResponseEntity.ok(responseMessage);
		} catch (Exception e) {

			// 사용자 삭제 중 에러가 발생했을 때
			String errorMessage = "동행 삭제 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	public ResponseEntity<List<TogetherDTO>> getAllTogether() {
		try {		
			List<Together> togetherList = togetherRepository.findAll();

			List<TogetherDTO> togetherDTOList = new ArrayList<TogetherDTO>();
			
			for (Together together : togetherList) {
				TogetherDTO togetherDTO = TogetherDTO.toDTO(together);
				
				togetherDTOList.add(togetherDTO);
			}
			return ResponseEntity.ok(togetherDTOList);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}


}
