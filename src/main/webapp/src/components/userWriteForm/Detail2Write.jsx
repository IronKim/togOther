import React from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import { HiArrowCircleLeft } from 'react-icons/hi';

const Detail2Write = ({ onInput, inputUserData, nextPage, prevPage, styles }) => {
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

            <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div className={styles.tagDiv} >
                    <div className={styles.inputFieldCk}>
                        <div className={styles.inputFieldF}>
                            <p>음식취향<br/>(다중선택가능)</p>
                        </div>

                        <p>여행은 술과 함께 즐겨요🍷&nbsp;<input type='checkbox' className={styles.chkI} id='id' value='펍' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('펍')} /><label className={` ${styles.chk}`} htmlFor='id'></label></p>
                        <p>달달한 디저트를 즐겨 먹어요🥐&nbsp;<input type='checkbox' className={styles.chkI} id='id2' value='디저트' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('디저트')} /><label className={` ${styles.chk}`} htmlFor='id2'></label></p>
                        <p>한식없이는 못 살아요~🍚&nbsp;<input type='checkbox' className={styles.chkI} id='id3' value='한식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('한식')}></input><label className={`  ${styles.chk}`} htmlFor='id3'></label></p>
                        <p>분위기 좋게 양식?🍝&nbsp;<input type='checkbox' className={styles.chkI} id='id4' value='양식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('양식')}></input><label className={` ${styles.chk}`} htmlFor='id4'></label></p>
                        <p>니하오?중식!&nbsp;🥮<input type='checkbox' className={styles.chkI} id='id5' value='중식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('중식')}></input><label className={` ${styles.chk}`} htmlFor='id5'></label></p>
                        <p>초밥 등 일식은 어때?&nbsp;🍣<input type='checkbox' className={styles.chkI} id='id6' value='일식' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('일식')}></input><label className={` ${styles.chk}`} htmlFor='id6'></label></p>
                        <p>현지에서는 로컬음식과 함께!🌮&nbsp;<input type='checkbox' className={styles.chkI} id='id7' value='로컬' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('로컬')}></input><label className={` ${styles.chk}`} htmlFor='id7'></label></p>
                        <p>저는 비건입니다~🥬&nbsp;<input type='checkbox' className={styles.chkI} id='id8' value='비건' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('비건')}></input><label className={` ${styles.chk}`} htmlFor='id8'></label></p>
                        <p>저는 육식공룡이에요!🍖&nbsp;<input type='checkbox' className={styles.chkI} id='id9' value='육류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('육류')}></input><label className={` ${styles.chk}`} htmlFor='id9'></label></p>
                        <p>바닷속의 맛! 해산물 마니아! &nbsp;🦪<input type='checkbox' className={styles.chkI} id='id10' value='해산물' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('해산물')}></input><label className={` ${styles.chk}`} htmlFor='id10'></label></p>
                        <p>후루룩~! 면을 좋아해요~🍜&nbsp;<input type='checkbox' className={styles.chkI} id='id11' value='면류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('면류')}></input><label className={` ${styles.chk}`} htmlFor='id11'></label></p>
                        <p>한국사람은 밥심!&nbsp;🥘<input type='checkbox' className={styles.chkI} id='id12' value='밥류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('밥류')}></input><label className={` ${styles.chk}`} htmlFor='id12'></label></p>
                        <p>국이 없으면 수저를 들지않아요!🍲&nbsp;<input type='checkbox' className={styles.chkI} id='id13' value='국류' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('국류')}></input><label className={` ${styles.chk}`} htmlFor='id13'></label></p>
                        <p>무엇이든 상관 없이 잘 먹지요~😋&nbsp;<input type='checkbox' className={styles.chkI} id='id14' value='기타' onChange={handleFoodCheckboxChange} checked={inputUserData.likingFood?.includes('기타')}></input><label className={` ${styles.chk}`} htmlFor='id14'></label></p>
                    </div>
                    <div className={styles.inputFieldCk}>
                        <div className={styles.inputFieldF}>
                            <p>여행취향<br/>(다중선택가능)</p>
                        </div>
                        <p>자연에서 느끼는 힐링~🌱&nbsp;<input type='checkbox' className={styles.chkI} id='id15' value='자연' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('자연')}></input><label className={` ${styles.chk}`} htmlFor='id15'></label></p>
                        <p>각지의 문화를 느껴요&nbsp;🧑‍🤝‍🧑<input type='checkbox' className={styles.chkI} id='id16' value='문화' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('문화')}></input><label className={` ${styles.chk}`} htmlFor='id16'></label></p>
                        <p>여행은 무조건 푹 쉬어야지요😴&nbsp;<input type='checkbox' className={styles.chkI} id='id17' value='휴양' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('휴양')}></input><label className={` ${styles.chk}`} htmlFor='id17'></label></p>
                        <p>미술,전시를 즐기는 문화인🖼️&nbsp;<input type='checkbox' className={styles.chkI} id='id18' value='전시' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('전시')}></input><label className={` ${styles.chk}`} htmlFor='id18'></label></p>
                        <p>쇼핑하며 플렉스!&nbsp;🎁<input type='checkbox' className={styles.chkI} id='id19' value='쇼핑' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('쇼핑')}></input><label className={` ${styles.chk}`} htmlFor='id19'></label></p>
                        <p>핫플만 찾아 다니는 인싸!🎉&nbsp;<input type='checkbox' className={styles.chkI} id='id20' value='핫플' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('핫플')}></input><label className={` ${styles.chk}`} htmlFor='id20'></label></p>
                        <p>액티비티 좋아하시나요..?🥽&nbsp;<input type='checkbox' className={styles.chkI} id='id21' value='활동' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('활동')}></input><label className={` ${styles.chk}`} htmlFor='id21'></label></p>
                        <p>신나는 놀이기구를 타볼까요?🎪&nbsp;<input type='checkbox' value='테마' className={styles.chkI} id='id22' onChange={handleTripCheckboxChange} checked={inputUserData.likingTrip?.includes('테마')}></input><label className={` ${styles.chk}`} htmlFor='id22'></label></p>
                    </div>
                </div>
                    <div>
                        <button className={styles.fbtn} onClick={prevPage}><HiArrowCircleLeft /></button>&nbsp;
                        <button className={styles.fbtn} onClick={nextPage}><HiArrowCircleRight /></button>&nbsp;
                    </div>
            </div>
        </div>
    );
};

export default Detail2Write;