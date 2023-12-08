package com.finalProject.togOther.user;

import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalProject.togOther.domain.NaverToken;
import com.finalProject.togOther.domain.Place;
import com.finalProject.togOther.domain.Planner;
import com.finalProject.togOther.domain.RefreshToken;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.PlaceDTO;
import com.finalProject.togOther.dto.PlannerDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;
import com.finalProject.togOther.dto.UserDTO;
import com.finalProject.togOther.repository.NaverTokenRepository;
import com.finalProject.togOther.repository.PlaceRepository;
import com.finalProject.togOther.repository.RefreshTokenRepository;
import com.finalProject.togOther.repository.UserRepository;
import com.finalProject.togOther.security.TokenProvider;

import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Value("${iamport.api.key}")
	private String apiKey;

	@Value("${iamport.api.secret}")
	private String apiSecret;
	
	@Value("${sms.APIKey}")
	private String APIKey;
	
	@Value("${sms.secretKey}")
	private String secretKey;
	
	@Value("${sms.fromNumber}")
	private String fromNumber;

	private UserRepository userRepository;
	
	private PlaceRepository placeRepository;
	
	private RefreshTokenRepository refreshTokenRepository;
	
	private NaverTokenRepository naverTokenRepository;

	private PasswordEncoder passwordEncoder;
	
	private TokenProvider tokenProvider;
	
	private DefaultMessageService messageService;
	
	private JavaMailSender javaMailSender;


	public UserServiceImpl(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
			PasswordEncoder passwordEncoder, TokenProvider tokenProvider, JavaMailSender javaMailSender,
			PlaceRepository placeRepository, NaverTokenRepository naverTokenRepository) {
		this.userRepository = userRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenProvider = tokenProvider;
		this.javaMailSender = javaMailSender;
		this.placeRepository = placeRepository;
		this.naverTokenRepository = naverTokenRepository;
	}

	// 사용자 추가 서비스
	@Override
	public ResponseEntity<String> addUser(RegisterDTO registerDTO) {

		try {
			
			if(!(registerDTO.getGender().equals("M")  || registerDTO.getGender().equals("F") || registerDTO.getGender().equals("U"))){
				throw new Exception();
			}

			// 비밀번호 인코딩
			registerDTO.setPwd(passwordEncoder.encode(registerDTO.getPwd()));

			User user = User.toEntity(registerDTO);
			// 사용자 추가 서비스 호출
			userRepository.save(user);

			// 사용자가 성공적으로 추가되었을 때
			String responseMessage = "사용자가 추가되었습니다.";
			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 사용자 추가 중 에러가 발생했을 때
			String errorMessage = "사용자 추가 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}

	}
	
	@Override
	public ResponseEntity<String> smsCertificationRequest(String userPhone) {
		
		try {
			
			boolean result = isUserExistsByPhone(userPhone).getBody();
			
			// 해당 핸드폰으로 가입되어있지 않을땐 ssodto를 넘겨주고 가입이 되어 있으면 서버에러를 띄워줌
			if (result) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
			}
			
			if(messageService == null)
				messageService = NurigoApp.INSTANCE.initialize(APIKey, secretKey, "https://api.coolsms.co.kr");
			
			Message message = new Message();
			
			String code = randomRange(6);
						
	        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
	        message.setFrom(fromNumber);
	        message.setTo(userPhone);
	        message.setText("[togOther] 문자 본인인증 서비스 : 인증번호는 " + "[" + code + "]" + " 입니다.");

	        SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
       
	        return ResponseEntity.ok(code);
	        
		} catch (Exception e) {
			
			String errorMessage = "인증번호 발송중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
			
		}

	}
	
	// 가입되어있는 유저의 핸드폰으로 문자 요청
	@Override
	public ResponseEntity<String> smsRequest(String userPhone) {
		
		try {
			
			boolean result = isUserExistsByPhone(userPhone).getBody();
			
			// 해당 핸드폰으로 가입되어있지 않을땐 서버에러를 띄워줌
			if (!result) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
			}
			
			if(messageService == null)
				messageService = NurigoApp.INSTANCE.initialize(APIKey, secretKey, "https://api.coolsms.co.kr");
			
			Message message = new Message();
			
			String code = randomRange(6);
						
	        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
	        message.setFrom(fromNumber);
	        message.setTo(userPhone);
	        message.setText("[togOther] 문자 본인인증 서비스 : 인증번호는 " + "[" + code + "]" + " 입니다.");

	        SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
       
	        return ResponseEntity.ok(code);
	        
		} catch (Exception e) {
			
			String errorMessage = "인증번호 발송중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
			
		}

	}

	// 사용자의 삭제 서비스
	@Override
	public ResponseEntity<String> deleteUser(String userEmail) {

		try {

			// 사용자 삭제 서비스 호출
			userRepository.deleteByEmail(userEmail);

			// 사용자가 성공적으로 삭제되었을 때
			String responseMessage = "사용자가 삭제되었습니다.";
			return ResponseEntity.ok(responseMessage);

		} catch (Exception e) {

			// 사용자 삭제 중 에러가 발생했을 때
			String errorMessage = "사용자 삭제 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}

	}

	// 사용자 조회 서비스(이메일)
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

	// 포트원 통합인증 인증정보 조회
	@Override
	public ResponseEntity<SSODTO> processCertificationRequest(String impUid) {

		try {
			// 인증 토큰 발급 받기
			RestTemplate restTemplate = new RestTemplate();

			Map<String, String> authRequest = new HashMap<>();
			authRequest.put("imp_key", apiKey);
			authRequest.put("imp_secret", apiSecret);

			ResponseEntity<Map> tokenResponse = restTemplate.postForEntity("https://api.iamport.kr/users/getToken",
					authRequest, Map.class);

			@SuppressWarnings("unchecked")
			String accessToken = (String) ((Map<String, String>) tokenResponse.getBody().get("response"))
					.get("access_token");

			// imp_uid로 인증 정보 조회
			HttpHeaders authHeaders = new HttpHeaders();
			authHeaders.set("Authorization", accessToken);

			ResponseEntity<Map> certificationsResponse = restTemplate.exchange(
					"https://api.iamport.kr/certifications/" + impUid, HttpMethod.GET, new HttpEntity<>(authHeaders),
					Map.class);

			@SuppressWarnings("unchecked")
			Map<String, Object> certificationsInfo = certificationsResponse.getBody();

			System.out.println(certificationsInfo);

			@SuppressWarnings("unchecked")
			Map<String, String> infoResponse = (Map<String, String>) certificationsInfo.get("response");

			System.out.println(infoResponse);

			SSODTO ssodto = SSODTO.builder().name(infoResponse.get("name")).phone(infoResponse.get("phone"))
					.birthday(LocalDate.parse(infoResponse.get("birthday"))).build();

			// 만 14세 이상이 아닐 때
			if (!isAbove14(ssodto.getBirthday())) {
				return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(null);
			}

			boolean result = isUserExistsByPhone(ssodto.getPhone()).getBody();

			// 해당 핸드폰으로 가입되어있지 않을땐 ssodto를 넘겨주고 가입이 되어 있으면 서버에러를 띄워줌
			if (!result) {
				return ResponseEntity.ok(ssodto);
			} else {
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

	@Override
	public ResponseEntity<LoginInResponseDTO> LoginUser(LoginDTO loginDTO) {

		try {
			
			// 이메일이 없거나 다르면 에러
			Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());
			User user = userOptional.orElseThrow();
			

			// 이메일이 같지만 비밀번호가 다르면 에러
			if (!passwordEncoder.matches(loginDTO.getPwd(), user.getPwd())) {
				throw new Exception();
			}
			
			// accessToken토큰과 refreshToken토큰 생성
			String accessToken = tokenProvider.createAccessToken(user.getEmail());
			String refreshToken = tokenProvider.createRefreshToken();
			
			// 해당 이메일에 refreshToken토큰이 있는지 확인후 없으면 만들어주고 있으면 토큰값만 수정하고 db에 저장
			Optional<RefreshToken> rOptional = refreshTokenRepository.findByUserEmail(user.getEmail());
						
			RefreshToken rToken = rOptional.orElse(RefreshToken.builder()
															   .userEmail(user.getEmail())
															   .token(refreshToken)
															   .build());
			rToken.setToken(refreshToken);
			
			refreshTokenRepository.save(rToken);
			
			// accessToken토큰과 refreshToken토큰과 유저 정보를 클라이언트에게 전달
			LoginInResponseDTO loginInResponseDTO = LoginInResponseDTO.builder()
																	  .accessToken(accessToken)
																	  .RefreshToken(refreshToken)
																	  .user(user)
																	  .build();

			return ResponseEntity.ok(loginInResponseDTO);

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@Override
	public ResponseEntity<?> naverLoginUser(String code, String state) {
	    try {
	        String clientId = "mY_CbvEkdc92AKz3xY24";
	        String clientSecret = "fhm959Nj9r";

	        // 네이버 토큰 발급 요청 URL
	        String tokenUrl = "https://nid.naver.com/oauth2.0/token";

	        // 헤더 설정
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

	        // 바디 설정
	        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
	        map.add("grant_type", "authorization_code");
	        map.add("client_id", clientId);
	        map.add("client_secret", clientSecret);
	        map.add("code", code);
	        map.add("state", state);

	        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

	        // RestTemplate을 사용하여 토큰 발급 요청
	        RestTemplate restTemplate = new RestTemplate();
	        ResponseEntity<String> response = restTemplate.exchange(
	                tokenUrl,
	                HttpMethod.POST,
	                request,
	                String.class
	        );

	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode jsonNode = objectMapper.readTree(response.getBody());
	        String accessToken = jsonNode.get("access_token").asText();
	                
	        
	        // 네이버 프로필 정보 조회 요청 URL
	        String profileUrl = "https://openapi.naver.com/v1/nid/me";
	        HttpHeaders userProfileHeaders = new HttpHeaders();
	        userProfileHeaders.set("Authorization", "Bearer " + accessToken);
	        
	        // RestTemplate을 사용하여 사용자 API 호출
	        HttpEntity<String> userProfileRequest = new HttpEntity<>(userProfileHeaders);
	        ResponseEntity<String> userProfileResponse = restTemplate.exchange(
	        		profileUrl,
	                HttpMethod.GET,
	                userProfileRequest,
	                String.class
	        );
	        
	        // 사용자 API 응답 출력
	        JsonNode rootNode = objectMapper.readTree(userProfileResponse.getBody());
	        JsonNode responseNode = rootNode.get("response");
	        
	        String profile_image = responseNode.get("profile_image").asText();
	        String gender = responseNode.get("gender").asText();
	        String email = responseNode.get("email").asText();
	        String mobile = responseNode.get("mobile").asText();
	        String name = responseNode.get("name").asText();
	        String birthyear = responseNode.get("birthyear").asText();
	        String birthday = responseNode.get("birthday").asText();
	        String numericMobile = mobile.replaceAll("[^0-9]", "");
	        int atIndex = email.indexOf('@');
	        String id = atIndex != -1 ? email.substring(0, atIndex) : email;
	        String combinedDate = birthyear + "-" + birthday;
	        
	        Optional<User> optionalUser = userRepository.findByEmail(email);
	        
	        User user = null;
	        
	        if(optionalUser.isPresent()) {
	        	user = optionalUser.orElseThrow();
	        }else {
	        	RegisterDTO registerDTO = RegisterDTO.builder()
	        									     .email(email)
	        									     .id(id)
	        									     .pwd(id)
	        									     .name(name)
	        									     .birthday(LocalDate.parse(combinedDate))
	        									     .phone(numericMobile)
	        									     .gender(gender)
	        									     .certification((byte) 1)
	        									     .build();
	        	addUser(registerDTO);
	        	
	        	var naverToken = naverTokenRepository.findByUserEmail(email);
	        	
	        	if(!naverToken.isPresent()) {
	        		naverTokenRepository.save(NaverToken.builder().userEmail(email).token(accessToken).build());	        			        		
	        	}
	        	
	        	user = userRepository.findByEmail(email).get();
	        }
	       
	        
			     // accessToken토큰과 refreshToken토큰 생성
				String access = tokenProvider.createAccessToken(user.getEmail());
				String refreshToken = tokenProvider.createRefreshToken();
				
				// 해당 이메일에 refreshToken토큰이 있는지 확인후 없으면 만들어주고 있으면 토큰값만 수정하고 db에 저장
				Optional<RefreshToken> rOptional = refreshTokenRepository.findByUserEmail(user.getEmail());
							
				RefreshToken rToken = rOptional.orElse(RefreshToken.builder()
																   .userEmail(user.getEmail())
																   .token(refreshToken)
																   .build());
				rToken.setToken(refreshToken);
				
				refreshTokenRepository.save(rToken);
				
				// accessToken토큰과 refreshToken토큰과 유저 정보를 클라이언트에게 전달
				LoginInResponseDTO loginInResponseDTO = LoginInResponseDTO.builder()
																		  .accessToken(access)
																		  .RefreshToken(refreshToken)
																		  .user(user)
																		  .build();
		
				return ResponseEntity.ok(loginInResponseDTO);

	    } catch (Exception e) {
	        e.printStackTrace();
	        // 예외 처리
	        return ResponseEntity.status(500).body("Internal Server Error");
	    }
	}
	
	@Override
	public ResponseEntity<LoginInResponseDTO> getUserByAccessToken(String authorizationHeader) {
		
		try {
			
			String userEmail;
			try {
				userEmail = tokenProvider.validate(authorizationHeader);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
			
			Optional<User> userOptional = userRepository.findByEmail(userEmail);
			
			User user = userOptional.orElseThrow();

	
			String accessToken = tokenProvider.createAccessToken(userEmail);
			
			LoginInResponseDTO loginInResponseDTO = LoginInResponseDTO.builder()
																	  .accessToken(accessToken)
																	  .user(user)
																	  .build();

			return ResponseEntity.ok(loginInResponseDTO);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@Override
	public ResponseEntity<String> logoutUser(String refreshToken) {
		
		try {
			
			Optional<RefreshToken> optionalReToken = refreshTokenRepository.findByToken(refreshToken);
			
			// db에 해당 refresh토큰이 없으면 에러
			RefreshToken rToken = optionalReToken.orElseThrow();
			
			refreshTokenRepository.deleteById(rToken.getRefreshTokenSeq());
			
			String responseMessage = "성공적으로 로그아웃 하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "로그아웃 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	// refreshToken으로 access토큰 발급
	@Override
	public ResponseEntity<Void> getTokenByRefreshToken(String refreshToken) {
		
		try {
			
			Optional<RefreshToken> optionalReToken = refreshTokenRepository.findByToken(refreshToken);
			
			// db에 해당 refresh토큰이 없으면 에러
			RefreshToken rToken = optionalReToken.orElseThrow();
			
			// 유효기간이 지난 refresh토큰일 경우 에러(다시 로그인 해야함)
			try {
				tokenProvider.validate(rToken.getToken());
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
			
			// 유효기간이 지나지 않았을 경우 access토큰 재발급
			String accessToken = tokenProvider.createAccessToken(rToken.getUserEmail());
			// 한번 access토큰을 발급해준 refresh토큰 재발급
			String updatedRefreshToken = tokenProvider.createRefreshToken();
			
			rToken.setToken(updatedRefreshToken);
			
			refreshTokenRepository.save(rToken);
			
			return ResponseEntity.ok()
			        .header(HttpHeaders.AUTHORIZATION, accessToken)
			        .header("Refresh-Token", updatedRefreshToken)
			        .build();
					
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
	}
	
	@Override
	public ResponseEntity<String> updateProfileText(int userSeq, String updatedProfileText) {
		
		try {
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setProfileText(updatedProfileText);
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
			
		}
		
	}
	
	@Override
	public ResponseEntity<String> updatePassword(int userSeq, String pwd, String updatedpwd) {
		
		System.out.println(updatedpwd);
		
		try {
			
			if(updatedpwd.length() < 4 ||updatedpwd.length() > 20) {
				throw new Exception();
			}
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			if (!passwordEncoder.matches(pwd, user.getPwd())) {
				String errorMessage = "현재 비밀번호가 일치하지 않습니다.";
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
			}
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setPwd(passwordEncoder.encode(updatedpwd));
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}
	
	@Override
	public ResponseEntity<String> recoveryPassword(int userSeq,String updatedpwd) {
		
		try {
			
			if(updatedpwd.length() < 4 ||updatedpwd.length() > 20) {
				throw new Exception();
			}
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setPwd(passwordEncoder.encode(updatedpwd));
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}
	
	@Override
	public ResponseEntity<String> updatePhone(int userSeq, String updatedPhone) {

		try {
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setPhone(updatedPhone);
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	@Override
	public ResponseEntity<String> updateMbti(int userSeq, String mbti) {
		
		try {
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setMBTI(mbti);
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	@Override
	public ResponseEntity<String> updateLikingTrip(int userSeq, String updatedTripLiking) {
		
		try {
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setLikingTrip(updatedTripLiking);
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	@Override
	public ResponseEntity<String> updateLikingFood(int userSeq, String updatedFoodLiking) {
		
		try {
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
			
			userDTO.setLikingFood(updatedFoodLiking);
			
			userRepository.save(User.toEntity(userDTO));
			
			String responseMessage = "성공적으로 수정하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
		} catch (Exception e) {
			
			String errorMessage = "수정 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	@Override
	public ResponseEntity<String> getUserByPhone(String phone) {
		
		try {
			Optional<User> userOptional = userRepository.findByPhone(phone);
			
			User user = userOptional.orElseThrow();
			
			return ResponseEntity.ok(UserDTO.toDTO(user).getEmail());
			
		} catch (Exception e) {
			String errorMessage = "서버에 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
		
	}
	
	
	@Override
	public ResponseEntity<Map<String,String>> sendEmail(String email) {
		
		MimeMessage message = javaMailSender.createMimeMessage();

	    try{
	    	
	    	 Optional<User> userOptional = userRepository.findByEmail(email);
	    	 
	    	 userOptional.orElseThrow();
	    	 
	    	 String seq = String.valueOf(userOptional.get().getUserSeq());
	    	
	    	 MimeMessageHelper messageHelper = new MimeMessageHelper(message, false, "UTF-8");
	    	 
	    	 String code = randomRange(6);
	    	 
	         // 1. 메일 수신자 설정
	         
	         messageHelper.setTo(email);

	         // 2. 메일 제목 설정
	         messageHelper.setSubject("[togOther] 인증코드 발급");

	         // 3. 메일 내용 설정
	         // HTML 적용됨
	         String content = "<!DOCTYPE html>\r\n"
	         		+ "\r\n"
	         		+ "<body>\r\n"
	         		+ "<div style=\"margin:100px;\">\r\n"
	         		+ "    <h1> 안녕하세요.</h1>\r\n"
	         		+ "    <h1> 여행일정 관리 및 동행 모집 플랫폼 togOther 입니다.</h1>\r\n"
	         		+ "    <br>\r\n"
	         		+ "    <p> 아래 코드를 인증번호입력 창으로 돌아가 입력해주세요.</p>\r\n"
	         		+ "    <br>\r\n"
	         		+ "\r\n"
	         		+ "    <div align=\"center\" style=\"border:1px solid black; font-family:verdana;\">\r\n"
	         		+ "        <h3 style=\"color:blue\">  인증 코드 입니다. </h3>\r\n"
	         		+ "        <p style=\"font-size:130%\">"+code+"</p>\r\n"
	         		+ "    </div>\r\n"
	         		+ "    <br/>\r\n"
	         		+ "</div>\r\n"
	         		+ "\r\n"
	         		+ "</body>\r\n"
	         		+ "</html>";
	         messageHelper.setText(content,true);

	         // 4. 메일 전송
	         javaMailSender.send(message);
	         
	         Map<String,String> map = new HashMap<String, String>();
	         
	         map.put("code",code);
	         map.put("userSeq", seq);
	         
	         return ResponseEntity.ok(map);
	    } catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    	
	    }
	}
	
	@Override
	public ResponseEntity<?> updateLikingPlace(int userSeq, int placeSeq) {
		
		try {
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			Optional<Place> optionalPlace = placeRepository.findById(placeSeq);
 			
			User user = optionalUser.orElseThrow();
			
			Place place = optionalPlace.orElseThrow();
			
			PlaceDTO placeDTO = PlaceDTO.toDTO(place);
			
			String likingPlace = user.getLikingPlace();
			
			boolean result = false;
			
			Set<String> existingValues = new HashSet<>();
			
			// 기존 값에서 중복 제거
			if(!(likingPlace == null || likingPlace == "")) {
				existingValues = new HashSet<>(Arrays.asList(likingPlace.split(",")));
			}
				
	        // 존재하는 경우 제거, 존재하지 않는 경우 추가
	        if (existingValues.contains(String.valueOf(placeSeq))) {
	            existingValues.remove(String.valueOf(placeSeq));
	            result = false;
	        } else {
	            existingValues.add(String.valueOf(placeSeq));
	            result = true;
	        }
	        
	        // 새로운 값을 다시 문자열로 변환
	        likingPlace = String.join(",", existingValues);
	        
	        UserDTO userDTO = UserDTO.toDTO(user);
	        
	        userDTO.setLikingPlace(likingPlace);
	        
	        userRepository.save(User.toEntity(userDTO));
	        
	        if(result) {
	        	placeDTO.setLikeCnt(placeDTO.getLikeCnt() + 1);
	        	placeRepository.save(Place.toEntity(placeDTO));
	        }else {
	        	placeDTO.setLikeCnt(placeDTO.getLikeCnt() - 1);
	        	placeRepository.save(Place.toEntity(placeDTO));
	        }
	       
	        return ResponseEntity.ok("성공적으로 수정하였습니다.");
			
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 중 오류가 발생했습니다.");
		}
		
		
	}
	
	@Override
	public ResponseEntity<String> getUserLikingPlace(int userSeq) {
		
		try {
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			return ResponseEntity.ok(UserDTO.toDTO(user).getLikingPlace());
			
			
		} catch (Exception e) {
			
			String errorMessage = "사용자 정보를 가져오는 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	
	@Override
	public ResponseEntity<?> updatecityList(int userSeq, String cityName) {
		
		try {
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			UserDTO userDTO = UserDTO.toDTO(user);
						
			String updatedCityList = updateCityList(userDTO.getCityList(), cityName);
						
			userDTO.setCityList(updatedCityList);
			
			userRepository.save(User.toEntity(userDTO));
			
			System.out.println(updatedCityList);
			
			return ResponseEntity.ok(updatedCityList);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 중 오류가 발생했습니다.");
		}
	}
	
	@Override
    public ResponseEntity<String> updateProfileImage(int userSeq, String updateProfileImage) {
        try {
            Optional<User> optionalUser = userRepository.findById(userSeq);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            User user = optionalUser.get();
            UserDTO userDTO = UserDTO.toDTO(user);
            userDTO.setProfileImage(updateProfileImage);

            userRepository.save(User.toEntity(userDTO));

            String responseMessage = "프로필 이미지가 성공적으로 업데이트되었습니다.";
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            String errorMessage = "프로필 이미지를 업데이트하는 중에 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
	
	
	@Override
	public ResponseEntity<String> withdrawalUser(int userSeq) {
		
		try {
			
			Optional<User> optionalUser = userRepository.findById(userSeq);
			
			User user = optionalUser.orElseThrow();
			
			userRepository.deleteById(userSeq);
			
			Optional<NaverToken> optionalNaverToken = naverTokenRepository.findByUserEmail(user.getEmail());
			
			if(optionalNaverToken.isPresent()) {
				System.out.println(optionalNaverToken.get().getToken());
				String naverToken = optionalNaverToken.get().getToken();
				String revokeUrl = "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=mY_CbvEkdc92AKz3xY24&client_secret=fhm959Nj9r&access_token="+naverToken+"&service_provider=NAVER";
		        URL url = new URL(revokeUrl);
		        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		        connection.setRequestMethod("GET");
		        int code = connection.getResponseCode();
		        System.out.println(code);
		        naverTokenRepository.deleteById(optionalNaverToken.get().getTokenSeq());;
			}
			
			String responseMessage = "성공적으로 삭제하였습니다.";
			return ResponseEntity.ok(responseMessage);
			
			
		} catch (Exception e) {
			
			String errorMessage = "삭제 중 오류가 발생했습니다.";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
	

	// 나이가 14세 이상인지 확인하는 함수
	private boolean isAbove14(LocalDate birthdate) {
		LocalDate today = LocalDate.now();
		Period age = Period.between(birthdate, today);

		// 만 14세 이상인 경우 true 반환
		return age.getYears() >= 14;
	}
	
	// 인증번호 범위 지정
    private String randomRange(int digit) {
    	 Random rand  = new Random();
         String numStr = "";
         for(int i=0; i<digit; i++) {
             String ran = Integer.toString(rand.nextInt(10));
             numStr+=ran;
         }
         return numStr;
    }
    
    private String updateCityList(String currentCityList, String newCityName) {
        List<String> cityList = new ArrayList<>();

        if (currentCityList != null) {
            // LinkedHashSet을 사용하여 순서를 보장
            Set<String> citySet = new LinkedHashSet<>(Arrays.asList(currentCityList.split(",")));
            cityList.addAll(citySet);
        }

        // 새로운 도시 이름이 비어있지 않고, 중복된 도시가 없으면 추가
        if (newCityName != null && !newCityName.isEmpty() && !cityList.contains(newCityName)) {
            cityList.add(newCityName);
        }
        
        // 최대 3개의 도시만 유지
        while (cityList.size() > 3) {
            cityList.remove(0);
        }

        return String.join(",", cityList);
    }

	@Override
	public String kakaoRefreshTokenGet() {
		try {
			
			Optional<RefreshToken> rOptional = refreshTokenRepository.findByUserEmail("kakao");
	
			RefreshToken refreshToken = rOptional.orElseThrow();
			
			String token= refreshToken.getToken();
			return token;
			
			
		} catch (Exception e) {
			return "error";
		}
	}

	@Override
	public ResponseEntity<?> kakaoRefreshTokenUpdate(String token) {
		try {
			
			Optional<RefreshToken> rOptional = refreshTokenRepository.findByUserEmail("kakao");
			
			if (rOptional.isPresent()) {
			    RefreshToken refreshToken = rOptional.orElseThrow();
			    refreshToken.setToken(token);
			    refreshTokenRepository.save(refreshToken);
			} else {
				RefreshToken refreshToken = new RefreshToken(0, "kakao", token);
				refreshTokenRepository.save(refreshToken);
			}
			
			return ResponseEntity.ok("success");
			
		} catch (Exception e) {
			
			String errorMessage = "failure";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}
}
