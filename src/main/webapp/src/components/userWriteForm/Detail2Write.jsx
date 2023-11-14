import React from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import { HiArrowCircleLeft } from 'react-icons/hi';

const Detail2Write = ({ onInput, inputUserData, nextPage, prevPage,styles }) => {
    const handleFoodCheckboxChange = (e) => {
        const value = e.target.value;

        // inputUserData의 likingFood 값을 업데이트
        const updatedFood = updateCheckboxValue(inputUserData.likingFood, value);
        onInput({ target: { name: 'likingFood', value: updatedFood } });
    };

    const handleTripCheckboxChange = (e) => {
        const value = e.target.value;

        // inputUserData의 likingTrip 값을 업데이트
        const updatedTrip = updateCheckboxValue(inputUserData.likingTrip, value);
        onInput({ target: { name: 'likingTrip', value: updatedTrip } });
    };

    // 중복된 값을 처리하고 업데이트
    const updateCheckboxValue = (existingValues, value) => {
        const values = existingValues ? existingValues.split(',') : [];

        // 중복 값이 이미 있는지 확인
        if (values.includes(value)) {
            // 이미 있는 경우 해당 값 제거
            const updatedValues = values.filter((v) => v !== value);
            return updatedValues.join(',');
        } else {
            // 중복되지 않는 경우 추가
            const updatedValues = [...values, value];
            return updatedValues.join(',');
        }
    };
    
    
    return (
        
        
        <div className={styles.writeContainerCk}>

            <div className={styles.inputFieldCk}>
                <p>음식취향(다중선택가능)</p>
                
                    <p>펍  여행은 술과 함께 즐겨요🍷&nbsp;<input type='checkbox' value='펍' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('펍')} /></p>
                    <p>디저트  달달한 디저트를 즐겨 먹어요🥐&nbsp;<input type='checkbox' value='디저트' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('디저트')}></input></p>
                    <p>한식  한식없이는 못 살아요~🍚&nbsp;<input type='checkbox' value='한식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('한식')}></input></p>
                    <p>양식  분위기 좋게 양식?🍝&nbsp;<input type='checkbox' value='양식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('양식')}></input></p>
                    <p>중식  니하오?중식!&nbsp;🥮<input type='checkbox' value='중식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('중식')}></input></p>
                    <p>일식  초밥 등 일식은 어때?&nbsp;🍣<input type='checkbox' value='일식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('일식')}></input></p>
                    <p>로컬  현지에서는 로컬음식과 함께!🌮&nbsp;<input type='checkbox' value='로컬' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('로컬')}></input></p>
                    <p>비건  저는 비건입니다~🥬&nbsp;<input type='checkbox' value='비건' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('비건')}></input></p>
                    <p>육류  저는 육식공룡이에요!🍖&nbsp;<input type='checkbox' value='육류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('육류')}></input></p>
                    <p>해산물  모르겠다&nbsp;🦪<input type='checkbox' value='해산물' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('해산물')}></input></p>
                    <p>면류  후루룩~! 면을 좋아해요~🍜&nbsp;<input type='checkbox' value='면류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('면류')}></input></p>
                    <p>밥류  한국사람은 밥심!&nbsp;🥘<input type='checkbox' value='밥류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('밥류')}></input></p>
                    <p>국류  국이 없으면 수저를 들지않아요~🍲&nbsp;<input type='checkbox' value='국류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('국류')}></input></p>
                    <p>기타  저는 무엇이든 상관 없이 잘 먹지요~😋&nbsp;<input type='checkbox' value='기타' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('기타')}></input></p>
                </div>
                <div className={styles.inputFieldCk}>
                    <p>여행취향(다중선택가능)</p>
                    
                    <p>자연  자연에서 느끼는 힐링~🌱&nbsp;<input type='checkbox' value='자연' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('자연')}></input></p>
                    <p>문화  각지의 문화를 느껴요&nbsp;🧑‍🤝‍🧑<input type='checkbox' value='문화' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('문화')}></input></p>
                    <p>휴양  여행은 무조건 푹 쉬어야지요😴&nbsp;<input type='checkbox' value='휴양' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('휴양')}></input></p>
                    <p>전시  미술,전시를 즐기는 문화인🖼️&nbsp;<input type='checkbox' value='전시' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('전시')}></input></p>
                    <p>쇼핑  쇼핑하며 플렉스!&nbsp;🎁<input type='checkbox' value='쇼핑' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('쇼핑')}></input></p>
                    <p>핫플  핫플만 찾아 다니는 인싸!🎉&nbsp;<input type='checkbox' value='핫플' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('핫플')}></input></p>
                    <p>활동  액티비티 좋아하시나요..?🥽&nbsp;<input type='checkbox' value='활동' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('활동')}></input></p>
                    <p>테마  모르겠음🎪&nbsp;<input type='checkbox' value='테마' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('테마')}></input></p>
                <div>
                    <button className={styles.fbtn} onClick={prevPage}><HiArrowCircleLeft/></button>&nbsp;
                    <button className={styles.fbtn} onClick={nextPage}><HiArrowCircleRight/></button>&nbsp;
                </div>
            </div>
        </div>
    );
};

export default Detail2Write;