import React from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';


const Write = ({onInput, inputUserData, nextPage,styles}) => {


    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    


    return (
        <div className={styles.writeContainer}>
          <h1>회원가입</h1>
          <div>필수 입력사항</div>
          <div>
            <br />
            <div>
              <input
                type='text'
                placeholder='이메일 입력'
                name='email'
                value={inputUserData.email}
                onChange={onInput}
                className={styles.inputField}
              />
            </div>
            
            <div>
              <input
                type='password'
                placeholder='비밀번호 입력'
                name='pwd'
                value={inputUserData.pwd}
                onChange={onInput}
                className={styles.inputField}
              />
            </div>
           
            <div>
              <input
                type='text'
                placeholder='이름 입력'
                name='name'
                value={inputUserData.name}
                onChange={onInput}
                className={styles.inputField}
              />
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
            
            <div>
              <input
                type='date'
                min={'1923-01-01'}
                max={getCurrentDate()}
                name='age'
                value={inputUserData.age}
                onChange={onInput}
                className={styles.inputField}
              />
            </div>
            <input type='hidden' name='national' value={inputUserData.national='KR'}></input>
          </div>
          
          <button onClick={() => nextPage()} className={styles.fbtn}>
            <HiArrowCircleRight />
          </button>
          &nbsp;
        </div>
    );
};

export default Write;
