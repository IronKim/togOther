package com.finalProject.togOther.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.CityDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;
import com.finalProject.togOther.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Value("${iamport.api.key}")
    private String apiKey;

    @Value("${iamport.api.secret}")
    private String apiSecret;
	
	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	//사용자 추가 서비스
	@Override
	public ResponseEntity<String> addUser(RegisterDTO registerDTO) {
		
		System.out.println(registerDTO.getEmail());
		System.out.println(registerDTO.getCertification());
		
		User user = User.toEntity(registerDTO);
		
		try {
			//사용자 추가 서비스 호출
			userRepository.save(user);
			
			//사용자가 성공적으로 추가되었을 때
			String responseMessage  = "사용자가 추가되었습니다.";
			return ResponseEntity.ok(responseMessage); 
			
		} catch (Exception e) {
			
			//사용자 추가 중 에러가 발생했을 때
			String errorMessage = "사용자 추가 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
		
	}

	//사용자의 삭제 서비스
	@Override
	public ResponseEntity<String> deleteUser(String userEmail) {
		
		try {
			
			//사용자 삭제 서비스 호출
			userRepository.deleteByEmail(userEmail);
			
			//사용자가 성공적으로 삭제되었을 때
            String responseMessage = "사용자가 삭제되었습니다.";
            return ResponseEntity.ok(responseMessage);
            
		} catch (Exception e) {
			
			//사용자 삭제 중 에러가 발생했을 때
            String errorMessage = "사용자 삭제 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}

	
	//사용자 조회 서비스(이메일)
	@Override
	public ResponseEntity<RegisterDTO> getUserByEmail(String userEmail) {

		
		try {
			Optional<User> userOptional = userRepository.findByEmail(userEmail);
			User user = userOptional.orElseThrow();
			
			RegisterDTO registerDTO = RegisterDTO.toDTO(user);
			
			return ResponseEntity.ok(registerDTO);
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	
	}
<<<<<<< HEAD

	//포트원 통합인증 인증정보 조회
	@Override
	public ResponseEntity<SSODTO> processCertificationRequest(String impUid) {
=======
	
	
>>>>>>> 99c187173fe560e724c4c8ee7a43ff5fefc1f224
		
		try {
            // 인증 토큰 발급 받기
            RestTemplate restTemplate = new RestTemplate();

            Map<String, String> authRequest = new HashMap<>();
            authRequest.put("imp_key", apiKey);
            authRequest.put("imp_secret", apiSecret);
            
            
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(
                    "https://api.iamport.kr/users/getToken",
                    authRequest,
                    Map.class
            );
            
            @SuppressWarnings("unchecked")
			String accessToken = (String)((Map<String, String>) tokenResponse.getBody().get("response")).get("access_token");
           
            // imp_uid로 인증 정보 조회
            HttpHeaders authHeaders = new HttpHeaders();
            authHeaders.set("Authorization", accessToken);
            
            ResponseEntity<Map> certificationsResponse = restTemplate.exchange(
                    "https://api.iamport.kr/certifications/" + impUid,
                    HttpMethod.GET,
                    new HttpEntity<>(authHeaders),
                    Map.class
            );
                   
            Map<String, Object> certificationsInfo = certificationsResponse.getBody();
            
            System.out.println(certificationsInfo);
            
            @SuppressWarnings("unchecked")
			Map<String, String> infoResponse = (Map<String, String>) certificationsInfo.get("response");
            
            System.out.println(infoResponse);
            
            SSODTO ssodto = SSODTO.builder()
            					  .name(infoResponse.get("name"))
            					  .phone(infoResponse.get("phone"))
            					  .birthday(LocalDate.parse(infoResponse.get("birthday")))
            					  .build();
            
            // 만 14세 이상이 아닐 때
            if(!isAbove14(ssodto.getBirthday())) {
            	return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(null);
            }
            
            boolean result = isUserExistsByPhone(ssodto.getPhone()).getBody();
            
            System.out.println(result);
            
            // 해당 핸드폰으로 가입되어있지 않을땐 ssodto를 넘겨주고 가입이 되어 있으면 서버에러를 띄워줌 
            if(!result) {
            	return ResponseEntity.ok(ssodto);
            }else {
            	return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
            

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

	@Override
	public ResponseEntity<Boolean> isUserExistsByPhone(String phone) {
		try {
			Optional<User> userOptional = userRepository.findByPhone(phone);
			
			boolean isUserExists = userOptional.isPresent();

	        return ResponseEntity.ok(isUserExists);
			
		} catch (Exception e) {
			return ResponseEntity.ok(false);
		}
	}
	
	// 나이가 14세 이상인지 확인하는 함수
    private boolean isAbove14(LocalDate birthdate) {
        LocalDate today = LocalDate.now();
        Period age = Period.between(birthdate, today);
        
        // 만 14세 이상인 경우 true 반환
        return age.getYears() >= 14;
    }
}
