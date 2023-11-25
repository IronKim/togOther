package com.finalProject.togOther.user;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.finalProject.togOther.domain.RefreshToken;
import com.finalProject.togOther.domain.User;
import com.finalProject.togOther.dto.LoginDTO;
import com.finalProject.togOther.dto.LoginInResponseDTO;
import com.finalProject.togOther.dto.RegisterDTO;
import com.finalProject.togOther.dto.SSODTO;
import com.finalProject.togOther.repository.RefreshTokenRepository;
import com.finalProject.togOther.repository.UserRepository;
import com.finalProject.togOther.security.TokenProvider;

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
	
//	@Value("${sms.APIKey}")
//	private String APIKey;
//	
//	@Value("${sms.secretKey}")
//	private String secretKey;
//	
//	@Value("${sms.fromNumber}")
//	private String fromNumber;

	private UserRepository userRepository;
	
	private RefreshTokenRepository refreshTokenRepository;

	private PasswordEncoder passwordEncoder;
	
	private TokenProvider tokenProvider;
	
//	private DefaultMessageService messageService;


	public UserServiceImpl(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
			PasswordEncoder passwordEncoder, TokenProvider tokenProvider) {
		this.userRepository = userRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.tokenProvider = tokenProvider;
	}

	// 사용자 추가 서비스
	@Override
	public ResponseEntity<String> addUser(RegisterDTO registerDTO) {

		try {
			
			if(!(registerDTO.getGender().equals("M")  || registerDTO.getGender().equals("F"))){
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
		// TODO Auto-generated method stub
		return null;
	}
	
//	@Override
//	public ResponseEntity<String> smsCertificationRequest(String userPhone) {
//		
//		try {
//			
//			boolean result = isUserExistsByPhone(userPhone).getBody();
//			
//			// 해당 핸드폰으로 가입되어있지 않을땐 ssodto를 넘겨주고 가입이 되어 있으면 서버에러를 띄워줌
//			if (result) {
//				return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
//			}
//			
//			if(messageService == null)
//				messageService = NurigoApp.INSTANCE.initialize(APIKey, secretKey, "https://api.coolsms.co.kr");
//			
//			Message message = new Message();
//			
//			String code = randomRange(6);
//						
//	        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
//	        message.setFrom(fromNumber);
//	        message.setTo(userPhone);
//	        message.setText("[togOther] 문자 본인인증 서비스 : 인증번호는 " + "[" + code + "]" + " 입니다.");
//
//	        SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
//       
//	        return ResponseEntity.ok(code);
//	        
//		} catch (Exception e) {
//			
//			String errorMessage = "인증번호 발송중 오류가 발생했습니다.";
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
//			
//		}
//
//	}

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
}
