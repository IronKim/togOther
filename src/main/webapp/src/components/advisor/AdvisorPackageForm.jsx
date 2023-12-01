import React, { useEffect, useState } from 'react';

import styles from '../../css/advisor.module.css';
import noImage from '../../assets/image/no_image.png';
import { addPackage, updatePackage } from '../../api/AdvisorApiService';

const AdvisorPackageForm = ({selectedPackage,onInputPackage,getPackageList, onErrorImg, isValidDate}) => {

    const {tpSeq, citySeq, tpTitle, tpThumbnail, tpPrice, tpImages, tpcontext, tpsaleStart, tpsaleEnd} = selectedPackage;

    const [tpImage, setTpImage] = useState([]);

    const [tpText, setTpText] =  useState([]);

    const update = () =>{

        if ((isValidDate(tpsaleStart)) === false || (isValidDate(tpsaleEnd)) === false) {
            return;
          }

        const updatedPackage = {
            ...selectedPackage,
            tpImages: tpImage.join(','),
            tpcontext: tpText.join(','),
        };


        updatePackage(tpSeq, updatedPackage)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getPackageList);
    }

    const create = () => {

        const updatedPackage = {
            ...selectedPackage,
            tpImages: tpImage.join(','),
            tpcontext: tpText.join(','),
        };

        addPackage(updatedPackage)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getPackageList);

    }

    useEffect(() => {
        
        setTpImage(tpImages ? tpImages.split(',') : []);
        setTpText(tpcontext ? tpcontext.split(',') : []);
    }
    , [tpImages, tpcontext])

    const imageAdd = () => {
        setTpImage([...tpImage, ''])
    }

    const textAdd = () => {
        setTpText([...tpText, ''])
    }

    const onInputChange = (index, value) => {
        const updatedImages = [...tpImage];
        updatedImages[index] = value;
        setTpImage(updatedImages);
    }
    
    const onInputTextChange = (index, value) => {
        const updatedText = [...tpText];
        updatedText[index] = value;
        setTpText(updatedText);
    }

    

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '40em'}}>
                <div className='form-floating mb-3 mt-3'>
                    <input className='form-control' id='tpSeq' type='text' name='tpSeq' value={tpSeq || ''} readOnly />
                    <label htmlFor='tpSeq'>tpSeq</label>
                </div>

                <input type='hidden' name='citySeq' value={citySeq} />
                
                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpTitle' name='tpTitle' value={tpTitle || ''} onChange={onInputPackage} />
                    <label htmlFor='tpTitle'>패키지제목</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpPrice' name='tpPrice' value={tpPrice || ''} onChange={onInputPackage} />
                    <label htmlFor='tpPrice'>가격</label>
                </div>

                <div className="d-flex justify-content-evenly" >
                    <button className="btn btn-success " type='button' onClick={imageAdd}>이미지 추가</button>
                    <button className="btn btn-success " type='button' onClick={textAdd}>설명 추가</button>
                    <button className="btn btn-success " type='button' onClick={tpSeq === '0' ? create : update}>{tpSeq === '0' ? '등록': '수정'}</button>
                </div>

                <div className='form-floating mb-3'>
                    <input
                        className={`form-control ${isValidDate(tpsaleStart) ? '' : 'is-invalid'}`}
                        type='text'
                        id='tpsaleStart'
                        name='tpsaleStart'
                        value={tpsaleStart || ''}
                        onChange={onInputPackage}
                    />
                    <label htmlFor='tpsaleStart'>판매시작일</label>
                    {!isValidDate(tpsaleStart) && (
                        <div className='invalid-feedback'>
                        날짜 형식이 올바르지 않습니다. (0000-00-00 형식으로 입력하세요)
                        </div>
                    )}
                </div>

                <div className='form-floating mb-3'>
                    <input
                        className={`form-control ${isValidDate(tpsaleEnd) ? '' : 'is-invalid'}`}
                        type='text'
                        id='tpsaleEnd'
                        name='tpsaleEnd'
                        value={tpsaleEnd || ''}
                        onChange={onInputPackage}
                    />
                    <label htmlFor='tpsaleEnd'>판매종료일</label>
                    {!isValidDate(tpsaleEnd) && (
                        <div className='invalid-feedback'>
                        날짜 형식이 올바르지 않습니다. (0000-00-00 형식으로 입력하세요)
                        </div>
                    )}
                </div>

            </div>

            <div style={{width: '60em'}}>
                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpThumbnail || noImage} onError={onErrorImg} alt='썸네일 이미지 링크' />

                <div className='input-group mb-3 mt-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='tpThumbnail' name='tpThumbnail' value={tpThumbnail || ''} onChange={onInputPackage}/>
                        <label htmlFor='tpThumbnail'>썸네일 이미지 링크</label>
                    </div>
                </div>

                {
                    Array.from({ length: Math.max(tpImage.length, tpText.length) }).map((_, index) => (
                        <div key={index}>
                            {index < tpImage.length && (
                                <div>
                                    <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpImage[index]} onError={onErrorImg} alt='추가 이미지 링크' />
                                    <div className='input-group mt-3 mb-3'>
                                        <span className='input-group-text'>🖼️</span>
                                        <div className='form-floating'>
                                            <input
                                                className='form-control'
                                                type='text'
                                                id={`tpImages${index}`}
                                                name={`tpImages${index}`}
                                                value={tpImage[index] || ''}
                                                onChange={(e) => onInputChange(index, e.target.value)}
                                            />
                                            <label htmlFor={`tpImages${index}`}>추가 이미지 링크</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {index < tpText.length && (
                                <div>
                                    <div className='form-floating mb-3'>
                                        <textarea
                                            className="form-control"
                                            style={{ height: '100px' }}
                                            id={`tpcontext${index}`}
                                            name={`tpcontext${index}`}
                                            value={tpText[index] || ''}
                                            onChange={(e) => onInputTextChange(index, e.target.value)}
                                        ></textarea>
                                        <label htmlFor={`tpcontext${index}`}>설명</label>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }

            </div>

            {/* <div style={{width: '60em'}}>

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

            </div> */}
        </div>
    );
};

export default AdvisorPackageForm;