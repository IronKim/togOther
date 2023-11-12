import React, { useEffect } from 'react';
import defaultImg from '../../assets/image/no_image.png';

import styles from '../../css/advisor.module.css'

const AdvisorUserDetail = ({selectedUser}) => {

    const onErrorImg = (e) => {
        e.target.src = defaultImg;
    }
  

    const {userSeq, email, name, age, gender, national, cityFix, cityList, likingFood, likingTrip, mbti, profileImage, profileText} = selectedUser;

    return (
        <div className={styles.userDetail} style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{marginRight: '50px'}}>
                <img src={profileImage} alt="프로필 이미지" onError={onErrorImg} style={{width: '100px', height: '100px'}}/>
                <p>{profileText}</p>
            </div>
            <table className='table table-striped table-bordered' style={{width: '50%'}}>
                <tbody>
                    <tr><td>번호</td><td>{userSeq}</td><td>이메일</td><td>{email}</td></tr>
                    <tr><td>이름</td><td>{name}</td><td>나이</td><td>{age}</td></tr>
                    <tr><td>성별</td><td>{gender === 'M' ? '남자' : '여자'}</td><td>국적</td><td>{national}</td></tr>
                    <tr><td>즐겨찾는 도시</td><td>{cityFix}</td><td>최근 방문 도시</td><td>{cityList}</td></tr>
                    <tr><td>음식 취향</td><td>{likingFood}</td><td>여행 취향</td><td>{likingTrip}</td></tr>
                    <tr><td>MBTI</td><td>{mbti}</td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdvisorUserDetail;

//         cityFix: '',
//         cityList: '',
//         coin: '',
//         dupLogin: '',
//         gender: '',
//         likingFood: '',
//         likingTrip: '',
//         mbti: '',
//         national: '',
//         profileImage: '',
//         profileText: ''