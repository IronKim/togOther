
import React, { useEffect } from 'react';

import styles from '../../css/advisor.module.css';
import { addPackageDetail, updatePackageDetail } from '../../api/AdvisorApiService';

const AdvisorPackageDetailForm = ({selectedPackageDetail, onInputPackageDetail ,getpackageDetailList, onErrorImg}) => {
    
    const {tpdSeq, tpSeq, tpdImages, tpdcontext, tpdsaleStart, tpdsaleEnd} = selectedPackageDetail;

    const update = () =>{
        updatePackageDetail(tpSeq, selectedPackageDetail)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getpackageDetailList);

    }

    const create = () => {
        addPackageDetail(selectedPackageDetail)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getpackageDetailList);
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '40em'}}>
                <div className='form-floating mb-3 mt-3'>
                    <input className='form-control' id='tpdSeq' type='text' name='tpdSeq' value={tpdSeq || ''} readOnly />
                    <label htmlFor='tpdSeq'>tpdSeq</label>
                </div>

                <input type='hidden' name='tpSeq' value={tpSeq} />

                <div className='row g-2 mb-3'>
                    <div className="col-md">
                        <div className="form-floating">
                            <input className='form-control' type='date' id='tpdsaleStart' name='tpdsaleStart' value={tpdsaleStart || ''} onChange={onInputPackageDetail} />
                            <label htmlFor='tpdsaleStart'>시작 날짜</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input className='form-control' type='date' id='tpdsaleEnd' name='tpdsaleEnd' value={tpdsaleEnd || ''} onChange={onInputPackageDetail} />
                            <label htmlFor='tpdsaleEnd'>종료 날짜</label>
                        </div>
                    </div>
                </div> 

  
                {/* <div className='form-floating mb-3'>
                    <input className='form-control' type='number' id='likeCnt' name='likeCnt' value={likeCnt || ''} readOnly />
                    <label htmlFor='likeCnt'>좋아요 수</label>
                </div> */}

                <button className="btn btn-success m-5" type='button' onClick={tpdSeq === '0' ? create : update}>{tpdSeq === '0' ? '추가': '수정'}</button>
            </div>

            <div style={{width: '60em'}}>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpdImages} onError={onErrorImg} alt='필수 이미지 링크' />

                <div className='input-group mb-3 mt-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='tpdImages' name='tpdImages' value={tpdImages || ''} onChange={onInputPackageDetail}/>
                        <label htmlFor='tpdImages'>이미지</label>
                    </div>
                </div>

                <div className='form-floating mt-3 mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='tpdcontext' name='tpdcontext' value={tpdcontext || ''} onChange={onInputPackageDetail}></textarea>
                    <label htmlFor='tpdcontext'>상세 설명</label>
                </div>

                {/* <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={subImage1} onError={onErrorImg} alt='추가 이미지 링크1' />

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
                </div> */}

            </div>
        </div>
    );
};

export default AdvisorPackageDetailForm;