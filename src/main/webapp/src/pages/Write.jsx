// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import DetailWrite from './DetailWrite';

// const Write = ({onInput, inputUserData, nextPage}) => {
//     // const navigate = useNavigate();
//     // const { state: initialData } = useLocation();

//     // const initialTemporaryData = initialData || JSON.parse(sessionStorage.getItem('temporaryData')) || {
//     //     id: '',
//     //     email: '',
//     //     pwd: '',
//     //     tel: '',
//     //     name: '',
//     //     age: '',
//     //     gender: '',
//     //     national: '',
//     //     profileImage: '',
//     //     profileText: '',
//     //     likingFood: '',
//     //     likingTrip: '',
//     // };
    
//     // const [temporaryData, setTemporaryData] = useState(initialTemporaryData);
//     // const [userData, setUserData] = useState({
//     //     id: '',
//     //     email: '',
//     //     pwd: '',
//     //     tel: '',
//     //     name: '',
//     //     age: '',
//     //     gender: '',
//     //     national: '',
//     //     profileImage: '',
//     //     profileText: '',
//     //     likingFood: '',
//     //     likingTrip: '',
//     // });

//     const getCurrentDate = () => {
//         const date = new Date();
//         const year = date.getFullYear();
//         let month = String(date.getMonth() + 1).padStart(2, '0');
//         let day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };

//     // const onInput = (e) => {
//     //     const { name, value } = e.target;

//     //     if (name === 'email') {
//     //         const atIndex = value.indexOf('@');
//     //         const id = atIndex !== -1 ? value.slice(0, atIndex) : value;
//     //         setTemporaryData((prevState) => ({ ...prevState, id, email: value }));
//     //     } else {
//     //         setTemporaryData((prevState) => ({ ...prevState, [name]: value }));
//     //     }
//     //     sessionStorage.setItem('temporaryData', JSON.stringify(temporaryData));
//     // };

//     // const onSubmit = () => {
//     //     setUserData(temporaryData);
//     //     sessionStorage.setItem('temporaryData', JSON.stringify(temporaryData));
//     //     navigate('/user/detailWrite', { state: temporaryData });
//     // };

//     useEffect(() => {
//         console.log(inputUserData);
//     }, [inputUserData]);

//     return (
//         <div>
//             <h1 style={{ textAlign: 'center' }}>회원가입</h1>
//             <table style={{ textAlign: 'center' }}>
//                 <thead>필수 입력사항</thead>
//                 <br></br>
//                 <tr>
//                     <input
//                         type='text'
//                         placeholder='이메일 입력'
//                         name='email'
//                         value={inputUserData.email}
//                         onChange={onInput}
//                     />
//                 </tr>
//                 <br></br>
//                 <tr>
//                     <input
//                         type='password'
//                         placeholder='비밀번호 입력'
//                         name='pwd'
//                         value={inputUserData.pwd}
//                         onChange={onInput}
//                     />
//                 </tr>
//                 <br></br>
//                 <tr>
//                     <input
//                         type='text'
//                         placeholder='이름 입력'
//                         name='name'
//                         onChange={onInput}
//                         value={inputUserData.name}
//                     />
//                 </tr>
//                 <br></br>
//                 <tr>
//                     <input
//                         type='radio'
//                         name='gender'
//                         value='male'
//                         checked={inputUserData.gender === 'male'}
//                         onChange={onInput}
//                     />
//                     남자
//                     <input
//                         type='radio'
//                         name='gender'
//                         value='female'
//                         checked={inputUserData.gender === 'female'}
//                         onChange={onInput}
//                     />
//                     여자
//                 </tr>
//                 <br></br>
//                 <tr>
//                     <input
//                         type='date'
//                         min={'1923-01-01'}
//                         max={getCurrentDate()}
//                         name='age'
//                         value={inputUserData.age}
//                         onChange={onInput}
//                     />
//                 </tr>
//                 <input type='hidden' name='national' value={inputUserData.national='kor'}></input>
//             </table>
//             <br></br>
//             <button onClick={()=> nextPage()}>다음</button>&nbsp;
//         </div>
//     );
// };

// export default Write;
import React from 'react';

const Write = ({onInput, inputUserData, nextPage}) => {


    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>회원가입</h1>
            <table style={{ textAlign: 'center' }}>
                <thead>필수 입력사항</thead>
                <br></br>
                <tr>
                    <input
                        type='text'
                        placeholder='이메일 입력'
                        name='email'
                        value={inputUserData.email}
                        onChange={onInput}
                    />
                </tr>
                <br></br>
                <tr>
                    <input
                        type='password'
                        placeholder='비밀번호 입력'
                        name='pwd'
                        value={inputUserData.pwd}
                        onChange={onInput}
                    />
                </tr>
                <br></br>
                <tr>
                    <input
                        type='text'
                        placeholder='이름 입력'
                        name='name'
                        value={inputUserData.name}
                        onChange={onInput}
                    />
                </tr>
                <br></br>
                <tr>
                    <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={inputUserData.gender === 'male'}
                        onChange={onInput}
                    />
                    남자
                    <input
                        type='radio'
                        name='gender'
                        value='female'
                        checked={inputUserData.gender === 'female'}
                        onChange={onInput}
                    />
                    여자
                </tr>
                <br></br>
                <tr>
                    <input
                        type='date'
                        min={'1923-01-01'}
                        max={getCurrentDate()}
                        name='age'
                        value={inputUserData.age}
                        onChange={onInput}
                    />
                </tr>
                <input type='hidden' name='national' value={inputUserData.national='kor'}></input>
            </table>
            <br></br>
            <button onClick={()=> nextPage()}>다음</button>&nbsp;
        </div>
    );
};

export default Write;
