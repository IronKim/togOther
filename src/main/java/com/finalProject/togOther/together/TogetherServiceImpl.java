package com.finalProject.togOther.together;

import java.util.ArrayList;
import java.util.List;

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
			
//=======
//
//			int togetherSeq = together.getTogetherSeq();
//
//			return ResponseEntity.ok(togetherSeq);
//
//		} catch (Exception e) {
//
//			return ResponseEntity.ok(-1);
//>>>>>>> b366596aeacfc7203d0d74ef7be37c4df0f26726
		}
		
	}

	@Override
	public ResponseEntity<List<TogetherDTO>> getTogetherList(int n) {
		try {
			Pageable pageable = PageRequest.of(0, n);
			
			System.out.println(n);
			
			List<Together> togetherList = togetherRepository.findAllByOrderByTogetherSeqDesc(pageable);

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
	public ResponseEntity<Integer> totTogether() {
		try {
			int total = (int) togetherRepository.count();
			
			return ResponseEntity.ok(total);
			
		} catch (Exception e) {
			return ResponseEntity.ok(-1);
		}
	}

}
