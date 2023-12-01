import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';

import styles from '../../css/advisor.module.css';
import noImage from '../../assets/image/no_image.png';
import { addPlace, updatePlace } from '../../api/AdvisorApiService';
import sweet from 'sweetalert2';    


const AdvisorPlaceForm = ({selectedPlace,onInputPlace,getPlaceList, onTagChange, onErrorImg}) => {
    
    const {placeSeq, citySeq, code, name,address,longitude,latitude,image,subImage1,subImage2,context1,context2,context3,likeCnt,tag} = selectedPlace;

    const tagList = (typeof tag === 'string') ? tag.split(',') : '';

    const update = () =>{
        updatePlace(placeSeq, selectedPlace)
        .then(res => {
            console.log(res.data);
            sweet.fire({
                title: "완료되었습니다.",
                icon: "success"
            })
        })
        .catch(e => console.log(e))
        .finally(getPlaceList);

    }

    const create = () => {
        addPlace(selectedPlace)
        .then(res => {
            console.log(res.data);
            sweet.fire({
                title: "완료되었습니다.",
                icon: "success"
            })
        })
        .catch(e => console.log(e))
        .finally(getPlaceList);
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '40em'}}>
                <div className='form-floating mb-3 mt-3'>
                    <input className='form-control' id='placeSeq' type='text' name='placeSeq' value={placeSeq || ''} readOnly />
                    <label htmlFor='placeSeq'>PlaceSeq</label>
                </div>

                <input type='hidden' name='citySeq' value={citySeq} />
                
                <label  className='form-floating mb-3 fs-5 ' >분류</label>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' id='code1' name='code' value='0' checked={code == 0} onChange={onInputPlace}/>
                    <label className='form-check-label' htmlFor='code1'>음식점</label>
                </div>

                <div className='form-check mb-3'>
                    <input className='form-check-input' type='radio' id='code2' name='code' value='1' checked={code == 1} onChange={onInputPlace}/>
                    <label className='form-check-label' htmlFor='code2'>관광지</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='name' name='name' value={name || ''} onChange={onInputPlace} />
                    <label htmlFor='name'>이름</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='address' name='address' value={address || ''} onChange={onInputPlace} />
                    <label htmlFor='address'>주소</label>
                </div>

                <div className='row g-2 mb-3'>
                    <div className="col-md">
                        <div className="form-floating">
                            <input className='form-control' type='text' id='latitude' name='latitude' value={latitude || ''} onChange={onInputPlace} />
                            <label htmlFor='latitude'>위도</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input className='form-control' type='text' id='longitude' name='longitude' value={longitude || ''} onChange={onInputPlace} />
                            <label htmlFor='longitude'>경도</label>
                        </div>
                    </div>
                </div>

  
                <div className='form-floating mb-3'>
                    <input className='form-control' type='number' id='likeCnt' name='likeCnt' value={likeCnt || ''} readOnly />
                    <label htmlFor='likeCnt'>좋아요 수</label>
                </div>

   
                <div className='mb-3'>
                    <label className='mb-3'>관광지 분류:</label><br/>
                    <input className='btn-check' type='checkbox' id='자연' name='tag' value='자연' checked={tagList.includes('자연')} onChange={onTagChange} />
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="자연">자연</label>
                    <input className='btn-check' type='checkbox' id='문화' name='tag' value='문화' checked={tagList.includes('문화')} onChange={onTagChange} />
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="문화">문화</label>
                    <input className='btn-check' type='checkbox' id='휴양' name='tag' value='휴양' checked={tagList.includes('휴양')} onChange={onTagChange} />
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="휴양">휴양</label>
                    <input className='btn-check' type='checkbox' id='전시' name='tag' value='전시' checked={tagList.includes('전시')} onChange={onTagChange} />
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="전시">전시</label>
                    <input className='btn-check' type='checkbox' id='쇼핑' name='tag' value='쇼핑' checked={tagList.includes('쇼핑')} onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="쇼핑">쇼핑</label>
                    <input className='btn-check' type='checkbox' id='핫플' name='tag' value='핫플' checked={tagList.includes('핫플')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="핫플">핫플</label>
                    <input className='btn-check' type='checkbox' id='활동' name='tag' value='활동' checked={tagList.includes('활동')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="활동">활동</label>
                    <input className='btn-check' type='checkbox' id='테마' name='tag' value='테마' checked={tagList.includes('테마')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="테마">테마</label>
                </div>

                <div className='mb-3'>
                    <label className='mb-3'>음식점 분류:</label> <br/>
                    <input className='btn-check' type='checkbox' id='펍' name='tag' value='펍' checked={tagList.includes('펍')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="펍">펍</label>
                    <input className='btn-check' type='checkbox' id='디저트' name='tag' value='디저트' checked={tagList.includes('디저트')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="디저트">디저트</label>
                    <input className='btn-check' type='checkbox' id='한식' name='tag' value='한식' checked={tagList.includes('한식')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="한식">한식</label>
                    <input className='btn-check' type='checkbox' id='양식' name='tag' value='양식' checked={tagList.includes('양식')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="양식">양식</label> 
                    <input className='btn-check' type='checkbox' id='중식' name='tag' value='중식' checked={tagList.includes('중식')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="중식">중식</label>    
                    <input className='btn-check' type='checkbox' id='일식' name='tag' value='일식' checked={tagList.includes('일식')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="일식">일식</label>           
                    <input className='btn-check' type='checkbox' id='로컬' name='tag' value='로컬' checked={tagList.includes('로컬')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="로컬">로컬</label>
                    <input className='btn-check' type='checkbox' id='기타' name='tag' value='기타' checked={tagList.includes('기타')}   onChange={onTagChange}/> &nbsp;
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="기타">기타</label>
                    <input className='btn-check' type='checkbox' id='비건' name='tag' value='비건' checked={tagList.includes('비건')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="비건">비건</label>
                    <input className='btn-check' type='checkbox' id='육류' name='tag' value='육류' checked={tagList.includes('육류')}   onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="육류">육류</label>
                    <input className='btn-check' type='checkbox' id='해산물' name='tag' value='해산물' checked={tagList.includes('해산물')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="해산물">해산물</label>
                    <input className='btn-check' type='checkbox' id='면류' name='tag' value='면류' checked={tagList.includes('면류')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="면류">면류</label>
                    <input className='btn-check' type='checkbox' id='밥류' name='tag' value='밥류' checked={tagList.includes('밥류')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="밥류">밥류</label>
                    <input className='btn-check' type='checkbox' id='국류' name='tag' value='국류' checked={tagList.includes('국류')}  onChange={onTagChange}/>
                    <label className="btn btn-outline-warning me-2 mb-3" htmlFor="국류">국류</label>
                </div>
                <button className="btn btn-success m-5" type='button' onClick={placeSeq === '0' ? create : update}>{placeSeq === '0' ? '추가': '수정'}</button>
            </div>

            <div style={{width: '60em'}}>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={image} onError={onErrorImg} alt='필수 이미지 링크' />

                <div className='input-group mb-3 mt-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='image' name='image' value={image || ''} onChange={onInputPlace}/>
                        <label htmlFor='image'>필수 이미지 링크</label>
                    </div>
                </div>

                <div className='form-floating mt-3 mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='context1' name='context1' value={context1 || ''} onChange={onInputPlace}></textarea>
                    <label htmlFor='context1'>설명</label>
                </div>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={subImage1} onError={onErrorImg} alt='추가 이미지 링크1' />

                <div className='input-group mt-3 mb-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='subImage1' name='subImage1' value={subImage1 || ''} onChange={onInputPlace} />
                        <label htmlFor='subImage1'>추가 이미지 링크</label>
                    </div>
                </div>
           
                <div className='form-floating mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='context2' name='context2' value={context2 || ''} onChange={onInputPlace}></textarea>
                    <label htmlFor='context2'>설명</label>
                </div>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={subImage2} onError={onErrorImg} alt='추가 이미지 링크2' />
                
                <div className='input-group mt-3 mb-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='subImage2' name='subImage2' value={subImage2 || ''} onChange={onInputPlace} />
                        <label htmlFor='subImage2' >추가 이미지 링크</label>
                    </div>
                </div>

                <div className='form-floating mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='context3' name='context3' value={context3 || ''} onChange={onInputPlace}></textarea>
                    <label htmlFor='context3'>설명</label>
                </div>

            </div>
        </div>
    );
};

export default AdvisorPlaceForm;