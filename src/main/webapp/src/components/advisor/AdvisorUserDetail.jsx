import React, { useEffect, useState } from 'react';
import defaultImg from '../../assets/image/profile_thumb.png';

import styles from '../../css/advisor.module.css'

const AdvisorUserDetail = ({selectedUser, placeList}) => {

    const {userSeq, email, name, birthday, phone, gender, national, likingPlace, cityList, likingFood, likingTrip, mbti, profileImage, profileText} = selectedUser;


    const onErrorImg = (e) => {
        e.target.src = defaultImg;
    }

    // likingPlace의 seq와 일치하는 place의 이름을 가져오는 함수
    const getLikingPlaceName = () => {
        const likingPlaceSeqArray = likingPlace ? likingPlace.split(',').map(Number): [];

        const likingPlaceNames = likingPlaceSeqArray
        .map(seq => {
            const matchingPlace = placeList.find(place => place.placeSeq === seq);
            return matchingPlace ? matchingPlace.name : null;
        })
        .filter(name => name !== null);


        return likingPlaceNames.join(', ');
    };

    let list = getLikingPlaceName();
    
    const calculateAgeFromBirthdate = (birthdate) => {
        const birthYear = parseInt(birthdate.split('-')[0], 10);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
      
        return age;
      };

    let age = calculateAgeFromBirthdate(birthday)

    

    return (
        <div className={styles.userDetail} style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{marginRight: '50px'}}>
                <img src={profileImage} alt="프로필 이미지" onError={onErrorImg} style={{width: '100px', height: '100px'}}/>
                <p style={{textAlign: 'center'}}>{profileText || '소개글이 없습니다.'}</p>
            </div>
            <table className='table table-striped table-bordered' style={{width: '80%'}}>
                <tbody>
                    <tr><td>번호</td><td>{userSeq}</td><td>이메일</td><td>{email}</td></tr>
                    <tr><td>이름</td><td>{name}</td><td>전화번호</td><td>{phone ? phone : '핸드폰 번호가 없습니다.'}</td></tr>
                    <tr><td>생년월일</td><td>{birthday}</td><td>나이</td><td>{age}</td></tr>
                    <tr><td>성별</td><td>{gender === 'M' ? '남자' : '여자'}</td><td>국적</td><td>{national}</td></tr>
                    <tr><td>즐겨찾는 장소</td><td>{list ? list : '즐겨찾는 장소가 없습니다.'}</td><td>최근 방문 도시</td><td>{cityList}</td></tr>
                    <tr><td>음식 취향</td><td>{likingFood ? likingFood : '음식 취향정보가 없습니다.'}</td><td>여행 취향</td><td>{likingTrip ? likingTrip : '여행 취향정보가 없습니다.'}</td></tr>
                    <tr><td>MBTI</td><td>{mbti ? mbti : 'MBTI가 없습니다.'}</td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdvisorUserDetail;
