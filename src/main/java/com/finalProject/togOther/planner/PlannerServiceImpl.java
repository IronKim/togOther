package com.finalProject.togOther.planner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
	
	public PlannerServiceImpl(PlannerRepository plannerRepository,SubItemRepository subItemRepository
			,PlannerTextRepository plannerTextRepository, PlannerImageRepository plannerImageRepository) {
		this.plannerRepository = plannerRepository;
		this.subItemRepository = subItemRepository;
		this.plannerTextRepository = plannerTextRepository;
		this.plannerImageRepository = plannerImageRepository;
	}	

	@Override
	public int addPlanner(PlannerDTO plannerDTO) {
		Planner planner = Planner.toEntity(plannerDTO);
		
		try {
			plannerRepository.save(planner);
			
			int plannerSeq = planner.getPlannerSeq();
			
			return plannerSeq;
			
		} catch (Exception e) {

			return -1;
		}
	}

	@Override
	public ResponseEntity<String> addSubItem(SubItemDTO subItemDTO) {
		SubItem subItem = SubItem.toEntity(subItemDTO);
		
		try {
			subItemRepository.save(subItem);
			
			String responseMessage  = "추가되었습니다.";
			
			return ResponseEntity.ok(responseMessage); 
			
		} catch (Exception e) {
			
			//도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	@Override
	public ResponseEntity<String> addPlannerText(PlannerTextDTO plannerTextDTO) {
		PlannerText plannerText = PlannerText.toEntity(plannerTextDTO);
		
		try {
			plannerTextRepository.save(plannerText);
			
			String responseMessage  = "추가되었습니다.";
			
			return ResponseEntity.ok(responseMessage); 
			
		} catch (Exception e) {
			
			//도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	@Override
	public ResponseEntity<String> addPlannerImage(PlannerImageDTO plannerImageDTO) {
		PlannerImage plannerImage = PlannerImage.toEntity(plannerImageDTO);
		
		try {
			plannerImageRepository.save(plannerImage);
			
			String responseMessage  = "추가되었습니다.";
			
			return ResponseEntity.ok(responseMessage); 
			
		} catch (Exception e) {
			
			//도시 추가 중 에러가 발생했을 때
			String errorMessage = "오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	
	

}

//	private	CityRepository cityRepository;
//	
//	private PlaceRepository placeRepository;
//	
//	private UserRepository userRepository;
//	
//	public PlannerServiceImpl(CityRepository cityRepository, PlaceRepository placeRepository, UserRepository userRepository) {
//		this.cityRepository = cityRepository;
//		this.placeRepository = placeRepository;
//		this.userRepository = userRepository;
//	}
//	
//	//유저 수정 (전체 정보)
//	@Override
//	public ResponseEntity<UserDTO> updateUser(int userSeq, UserDTO userDTO) {
//		
//		try {
//			Optional<User> userOptional = userRepository.findById(userSeq);
//			
//			userOptional.orElseThrow();
//						
//			User updatedUser = userRepository.save(User.toEntity(userDTO));
//			
//			return ResponseEntity.ok(UserDTO.toDTO(updatedUser));
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//		
//	}
//	
//	//유저 삭제 (이메일)
//	@Override
//	public ResponseEntity<String> deleteUserByEmail(String userEmail) {
//		
//		try {
//			//사용자 삭제 서비스 호출
//			userRepository.deleteByEmail(userEmail);
//			
//			//사용자가 성공적으로 삭제되었을 때
//            String responseMessage = "사용자가 삭제되었습니다.";
//            return ResponseEntity.ok(responseMessage);
//            
//		} catch (Exception e) {
//			
//			//사용자 삭제 중 에러가 발생했을 때
//            String errorMessage = "사용자 삭제 중 오류가 발생했습니다.";
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//		}
//	}
//
//	//유저 전체 조회
//	@Override
//	public ResponseEntity<List<UserDTO>> getUser() {
//		
//		try {
//			List<User> userList = userRepository.findAll();
//			
//			List<UserDTO> userDTOList = new ArrayList<UserDTO>();
//			
//			for (User user : userList) {
//				
//				UserDTO userDTO = UserDTO.toDTO(user);
//				
//				userDTOList.add(userDTO);
//			}
//				
//			return ResponseEntity.ok(userDTOList);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//		
//	}
//	
//	//유저 조회 아이디
//	@Override
//	public ResponseEntity<UserDTO> getUserById(String id) {
//		
//		try {
//			Optional<User> userOptional = userRepository.findById(id);
//			
//			User user = userOptional.orElseThrow();
//			
//			UserDTO userDTO = UserDTO.toDTO(user);
//			
//			return ResponseEntity.ok(userDTO);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//		
//	}
//
//	//도시 추가
//	@Override
//	public ResponseEntity<String> addCity(CityDTO cityDTO) {
//
//		City city = City.toEntity(cityDTO);
//		
//		try {
//			cityRepository.save(city);
//			
//			String responseMessage  = "도시가 추가되었습니다.";
//			
//			return ResponseEntity.ok(responseMessage); 
//			
//		} catch (Exception e) {
//			
//			//도시 추가 중 에러가 발생했을 때
//			String errorMessage = "도시 추가 중 오류가 발생했습니다.";
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//		}
//		
//	}
//	
//	//도시 수정 (전체 정보)
//	@Override
//	public ResponseEntity<CityDTO> updateCity(int citySeq, CityDTO cityDTO) {
//		
//		try {
//			
//			Optional<City> cityOptional = cityRepository.findById(citySeq);
//			
//			cityOptional.orElseThrow();
//						
//			City updatedCity = cityRepository.save(City.toEntity(cityDTO));
//			
//			return ResponseEntity.ok(CityDTO.toDTO(updatedCity));
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}
//	
//	//도시 삭제
//	@Override
//	public ResponseEntity<String> deleteCityBySeq(int seq) {
//		
//		try {
//			cityRepository.deleteById(seq);
//			
//			//사용자가 성공적으로 삭제되었을 때
//            String responseMessage = "도시가 삭제되었습니다.";
//            return ResponseEntity.ok(responseMessage);
//		} catch (Exception e) {
//			
//			//사용자 삭제 중 에러가 발생했을 때
//            String errorMessage = "도시 삭제 중 오류가 발생했습니다.";
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//		}
//		
//	}
//	
//	//도시 전체 조회
//	@Override
//	public ResponseEntity<List<CityDTO>> getCity() {
//		
//		try {
//			List<City> cityList = cityRepository.findAll();
//			
//			List<CityDTO> cityDTOList = new ArrayList<CityDTO>();
//			
//			for (City city : cityList) {
//				
//				CityDTO cityDTO = CityDTO.toDTO(city);
//				
//				cityDTOList.add(cityDTO);
//			}
//				
//			return ResponseEntity.ok(cityDTOList);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//	
//	//도시 조회 seq
//	@Override
//	public ResponseEntity<CityDTO> getCityBySeq(int seq) {
//		
//		try {
//			Optional<City> cityOptional = cityRepository.findById(seq);
//			
//			City city = cityOptional.orElseThrow();
//			
//			CityDTO cityDTO = CityDTO.toDTO(city);
//			
//			return ResponseEntity.ok(cityDTO);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//		
//	}
//
//	//장소 추가
//	@Override
//	public ResponseEntity<String> addPlace(PlaceDTO placeDTO) {
//		
//		Place place = Place.toEntity(placeDTO);
//		
//		try {
//			placeRepository.save(place);
//			
//			String responseMessage  = "장소가 추가되었습니다.";
//			
//			return ResponseEntity.ok(responseMessage); 
//			
//		} catch (Exception e) {
//			
//			//도시 추가 중 에러가 발생했을 때
//			String errorMessage = "장소 추가 중 오류가 발생했습니다.";
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//		}
//	}
//	
//	//장소 수정 (전체 정보)
//	@Override
//	public ResponseEntity<PlaceDTO> updatePlace(int placeSeq, PlaceDTO placeDTO) {
//		
//		try {
//			Optional<Place> PlaceOptional = placeRepository.findById(placeSeq);
//			
//			PlaceOptional.orElseThrow();
//						
//			Place updatedPlace = placeRepository.save(Place.toEntity(placeDTO));
//			
//			return ResponseEntity.ok(PlaceDTO.toDTO(updatedPlace));
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}
//	
//	//장소 삭제
//	@Override
//	public ResponseEntity<String> deletePlaceBySeq(int seq) {
//		
//		try {
//			placeRepository.deleteById(seq);
//			
//			//사용자가 성공적으로 삭제되었을 때
//            String responseMessage = "장소가 삭제되었습니다.";
//            return ResponseEntity.ok(responseMessage);
//		} catch (Exception e) {
//			
//			//사용자 삭제 중 에러가 발생했을 때
//            String errorMessage = "장소 삭제 중 오류가 발생했습니다.";
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//		}
//	}
//
//	//장소 전체 조회
//	@Override
//	public ResponseEntity<List<PlaceDTO>> getPlace() {
//		
//		try {
//			List<Place> placeList = placeRepository.findAll();
//			
//			List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();
//			
//			for (Place place : placeList) {
//				
//				PlaceDTO placeDTO = PlaceDTO.toDTO(place);
//				
//				placeDTOList.add(placeDTO);
//			}
//				
//			return ResponseEntity.ok(placeDTOList);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//	}
//
//	//장소 조회 seq
//	@Override
//	public ResponseEntity<PlaceDTO> getPlaceBySeq(int seq) {
//		
//		try {
//			Optional<Place> placeOptional = placeRepository.findById(seq);
//			
//			Place place = placeOptional.orElseThrow();
//			
//			PlaceDTO placeDTO = PlaceDTO.toDTO(place);
//			
//			return ResponseEntity.ok(placeDTO);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}
//
//	//장소 조회 citySeq
//	@Override
//	public ResponseEntity<List<PlaceDTO>> getPlaceByCitySeq(int citySeq) {
//		
//		try {
//			List<Place> placeList = placeRepository.findByCitySeq(citySeq);
//			
//			List<PlaceDTO> placeDTOList = new ArrayList<PlaceDTO>();
//			
//			for (Place place : placeList) {
//				
//				PlaceDTO placeDTO = PlaceDTO.toDTO(place);
//				
//				placeDTOList.add(placeDTO);
//			}
//				
//			return ResponseEntity.ok(placeDTOList);
//			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//		
//	}