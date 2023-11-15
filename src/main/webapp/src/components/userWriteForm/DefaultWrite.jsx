import React, { useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';

const Write = ({ onInput, inputUserData, nextPage, styles, userData }) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear() - 14;
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 각 입력 필드의 유효성 메시지를 관리하는 상태
  const [validationMessages, setValidationMessages] = useState({
    email: '',
    pwd: '',
    name: '',
    gender: '',
    birthday: '',
  });

  // 입력 필드의 값이 비어있는지 확인하는 함수
  const validateField = (field, value) => {
    if (!value) {
      return `${field}을(를) 입력해주세요`;
    }
    return '';
  };

  // 이메일 형식 유효성 검사를 수행하는 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(String(email));
  };

  // 다음 단계로 넘어가는 함수
  const handleNext = () => {
    const requiredFields = ['email', 'pwd', 'name', 'gender', 'birthday'];
    let isValid = true;
    let updatedMessages = {};

    // 필수 필드들의 유효성 검사를 수행하고 메시지를 업데이트
    requiredFields.some((field) => {
      const message = validateField(field, inputUserData[field]);
      updatedMessages[field] = message;
      if (message !== '' && isValid) {
        isValid = false;
      }
      return message !== ''; // 유효성 검사 메시지가 있는 첫 번째 필드 반환
    });

    // 이메일 유효성 검사 수행
    const email = inputUserData.email;
    if (!email) {
      updatedMessages['email'] = 'email을(를) 입력해주세요';
      isValid = false;
    } else if (!validateEmail(email)) {
      updatedMessages['email'] = '올바른 email 형식을 입력해주세요';
      isValid = false;
    }

    // 유효성 검사 메시지 업데이트
    setValidationMessages(updatedMessages);

    // 모든 필수 필드의 유효성 검사를 통과했다면 다음 단계로 이동
    if (isValid) {
      nextPage();
    } else {
      // 유효성 검사 실패 시 동작
    }
  };

  // 이메일 입력값 변경 시 유효성 검사 수행
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInput(e);
    if (name === 'email' && !validateEmail(value)) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: value ? '올바른 email 형식을 입력해주세요' : 'email을(를) 입력해주세요',
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: '',
      }));
    }
  };

  // 이름 입력값 변경 시 특수 문자 제거 및 상태 업데이트
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    onInput(e);
    
    const filteredValue = value.replace(/[~!@#$%^&*()_+={}|[\]\\';:"<>?,./]/g, ''); // 특수 문자 제거
    if (name === 'name' && value !== filteredValue) {
      e.target.value = filteredValue; // 특수 문자가 제거된 값으로 설정
      onInput({
        target: {
          name: 'name',
          value: filteredValue, // 특수 문자가 제거된 값으로 상태 업데이트
        },
      });
    }
  };

  return (
    <div className={styles.writeContainer}>
      <div>회원가입</div>
      <div>필수 입력사항</div>
      <div>
        <div>
          <input
            type='text'
            placeholder='이메일 입력'
            name='email'
            value={inputUserData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            maxLength={30}
          />
          {validationMessages.email && <span style={{ color: 'red' }}>{validationMessages.email}</span>}
        </div>
        <div>
          <input
            type='password'
            placeholder='비밀번호 입력'
            name='pwd'
            value={inputUserData.pwd}
            onChange={onInput}
            className={styles.inputField}
            maxLength={20}
          />
          {validationMessages.pwd && <span style={{ color: 'red' }}>{validationMessages.pwd}</span>}
        </div>
        <div>
          <input
            type='text'
            placeholder='이름 입력'
            name='name'
            value={userData.name !== '' ?  userData.name : inputUserData.name}
            onChange={handleNameChange}
            className={styles.inputField}
            maxLength={30}
            readOnly={userData.name !== ''}
          />
          {validationMessages.name && <span style={{ color: 'red' }}>{validationMessages.name}</span>}
        </div>
        <div>
          <input
            type='radio'
            name='gender'
            value='M'
            checked={inputUserData.gender === 'M'}
            onChange={onInput}
            className={styles.radioInput}
          />
          남자&nbsp;
          <input
            type='radio'
            name='gender'
            value='F'
            checked={inputUserData.gender === 'F'}
            onChange={onInput}
            className={styles.radioInput}
          />
          여자
        </div>
          {validationMessages.gender && <span style={{ color: 'red' }}>{validationMessages.gender}</span>}
        <div>
          <input
            type='date'
            min={'1923-01-01'}
            max={getCurrentDate()}
            name='birthday'
            value={userData.birthday !== '' ? userData.birthday : inputUserData.birthday}
            onChange={onInput}
            className={styles.inputField}
            readOnly={userData.name !== ''}
          />
          {validationMessages.birthday && <span style={{ color: 'red' }}>{validationMessages.birthday}</span>}
        </div>
        <input type='hidden' name='national' value={inputUserData.national = 'KR'}></input>
      </div>
      <button
        onClick={handleNext}
        className={styles.fbtn}
      >
        <HiArrowCircleRight />
      </button>
      &nbsp;
    </div>
  );
};

export default Write;