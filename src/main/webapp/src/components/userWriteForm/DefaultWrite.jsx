import React, { useEffect, useRef, useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';

const Write = ({onbirthInput, onInput, inputUserData, nextPage, styles, userData, checkEmail }) => {
  
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 87}, (_, i) => currentYear - i - 14);
    const months = Array.from({length: 12}, (_, i) => i + 1);

    // 기본적으로 1일부터 31일까지 설정
    let days = Array.from({length: 31}, (_, i) => i + 1);

    // 선택된 연도와 월에 따라 일의 범위를 동적으로 변경
    if (year && month) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    days = Array.from({length: lastDayOfMonth}, (_, i) => i + 1);
    }
    
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
  const handleNext = async () => {
    const requiredFields = ['email', 'pwd', 'name', 'birthday', 'gender'];
    let isValid = true;
    let updatedMessages = {};
  
    // 필수 필드들의 유효성 검사를 수행하고 메시지를 업데이트
    requiredFields.some((field) => {
        if(field === 'birthday' && (year === '' || month === '' || day === '')) {
            updatedMessages['birthday'] = '생년월일을 선택해주세요';
            isValid = false;
            return true;
        }
      const message = validateField(field, inputUserData[field]);
      updatedMessages[field] = message;
      if (message !== '') {
        isValid = false;
        return true;
      } 
      return false; // 유효성 검사 메시지가 있는 첫 번째 필드 반환
    });

    // 이메일 유효성 검사 수행
    const email = inputUserData.email;
    if (!email) {
      updatedMessages['email'] = 'email을(를) 입력해주세요';
      isValid = false;
    } else if (!validateEmail(email)) {
      updatedMessages['email'] = '올바른 email 형식을 입력해주세요';
      isValid = false;
    } else {
        try {
          const isEmailAvailable = await checkEmail(inputUserData.email);
          if (isEmailAvailable) {
            updatedMessages['email'] = '중복된 이메일입니다.';
            isValid = false;
          }
        } catch (error) {
        }
    }


    if(year === '' || month === '' || day === '') {
    }else {
        onbirthInput(year + '-' + month + '-' + day);
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
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    onInput(e);
    
    if (name === 'email') {
      if (!validateEmail(value)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          email: value ? '올바른 email 형식을 입력해주세요' : 'email을(를) 입력해주세요',
        }));
      } else {
        try {
          const isEmailAvailable = await checkEmail(value);
          if (isEmailAvailable) {
            setValidationMessages((prevMessages) => ({
              ...prevMessages,
              email: '중복된 이메일입니다.',
            }));
          }
        } catch (error) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            email: '',
          }));
          // 에러 발생 시 처리
        }}}
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
      <div className='mb-3'>
        <p className='fs-1'>정보입력 (필수)</p>
      </div>
      <div className='d-lg-flex flex-column'>
        <div className={styles.formGroup}>
            <input
                type='text'
                name='email'
                value={inputUserData.email}
                onChange={handleInputChange}
                maxLength={30}
                required
            />
            <label>이메일 입력<span > (@이외의 특수문자 제외, 30자 내외)</span></label>
        </div>

          {validationMessages.email && <span style={{ color: 'red' }}>{validationMessages.email}</span>}
        <div className={styles.formGroup}>
            <input
                type='password'
                name='pwd'
                value={inputUserData.pwd}
                onChange={onInput}
                maxLength={20}
                required
            />
            <label>비밀번호 입력<span > (20자 내외)</span></label>
        </div>
          {validationMessages.pwd && <span style={{ color: 'red' }}>{validationMessages.pwd}</span>}

        <div className={styles.formGroup}>
            <input
                type='password'
                name='pwd'
                value={inputUserData.pwd}
                onChange={onInput}
                maxLength={20}
                required
            />
            <label>비밀번호 확인</label>
        </div>


        <div className={styles.formGroup}>
            <input
                type='text'
                name='name'
                value={userData.name !== '' ?  userData.name : inputUserData.name}
                onChange={handleNameChange}
                maxLength={30}
                readOnly={userData.name !== ''}
                required
            />
            <label>이름 입력<span > (30자 내외)</span></label>
        </div>
          {validationMessages.name && <span style={{ color: 'red' }}>{validationMessages.name}</span>}
        
        <div className='mb-3 mt-3' style={{width: '80%', margin: '0 auto'}}>
            <p className='fs-3 mb-3' style={{textAlign: 'left' }}>생년월일</p>
            <div className='d-flex justify-content-evenly'>
                <select className={styles.selectBox} name='year' onChange={(e) => setYear(e.target.value)}>
                    <option value=''>년도</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                {validationMessages.year && <span style={{ color: 'red' }}>{validationMessages.year}</span>}
                <select className={styles.selectBox} name='month' onChange={(e) => setMonth(e.target.value)}>
                    <option value=''>월</option>
                    {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
                {validationMessages.month && <span style={{ color: 'red' }}>{validationMessages.month}</span>}
                <select className={styles.selectBox} name='day' onChange={(e) => setDay(e.target.value)}>
                    <option value=''>일</option>
                    {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
            </div>
                {validationMessages.day && <span style={{ color: 'red' }}>{validationMessages.day}</span>}
        </div>

        {validationMessages.birthday && <span style={{ color: 'red' }}>{validationMessages.birthday}</span>}

        <div style={{margin: '0 auto'}} className='m-3 d-flex justify-content-evenly'>
            <label htmlFor="radio-1" className={styles.radio}>
            <input id="radio-1" type="radio"
                name='gender'
                value='M'
                checked={inputUserData.gender === 'M'}
                onChange={onInput}
                    />
            <span className={styles.radioMark}></span>
            남자
            </label>

            <label htmlFor="radio-2" className={styles.radio}>
            <input id="radio-2" type='radio'
                name='gender'
                value='F'
                checked={inputUserData.gender === 'F'}
                onChange={onInput} />
            <span className={styles.radioMark}></span>
            여자
            </label>
        </div>
          {validationMessages.gender && <span style={{ color: 'red' }}>{validationMessages.gender}</span>}
        
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