import React from 'react';
import styles from '../../css/advisor.module.css';

import { addPackageDetail, updatePackageDetail } from '../../api/AdvisorApiService';
import { addPackage, updatePackage } from '../../api/AdvisorApiService';

const AdvisorPackageForm = ({selectedPackageDetail, selectedPackage, onInputPackageDetail, getTourPackgeList, onErrorImg}) => {

    const { tpdSeq,tpSeq,tpdImages,tpdcontext,tpdsaleStart,tpdsaleEnd} = selectedPackageDetail;
    const { citySeq, tpTitle, tpdThumbnail, tpdPrice } = selectedPackage;

    const updatePackage = () =>{
        updatePackage(tpSeq, selectedPackage)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getTourPackgeList);

    }

    const createPackage = () => {
        addPackage(selectedPackage)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getTourPackgeList);
    }

    const update = () =>{
        updatePackageDetail(tpdSeq, selectedPackageDetail)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getTourPackgeList);

    }

    const create = () => {
        addPackageDetail(selectedPackageDetail)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getTourPackgeList);
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '40em'}}>
                <div className='form-floating mb-3 mt-3'>
                    <input className='form-control' id='citySeq' type='text' name='citySeq' value={citySeq || ''} readOnly />
                    <label htmlFor='citySeq'>도시 번호</label>
                </div>

                <div className='form-floating mb-3 mt-3'>
                    <input className='form-control' id='tpdSeq' type='text' name='tpdSeq' value={tpdSeq || ''} readOnly />
                    <label htmlFor='tpdSeq'>투어패키지 번호</label>
                </div>

                <input type='hidden' name='tpSeq' value={tpSeq} />

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpTitle' name='tpTitle' value={tpTitle || ''} onChange={onInputPackageDetail} />
                    <label htmlFor='tpTitle'>패키지 제목</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpdPrice' name='tpdPrice' value={tpdPrice || ''} onChange={onInputPackageDetail} />
                    <label htmlFor='tpdPrice'>패키지 가격</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpdsaleStart' name='tpdsaleStart' value={tpdsaleStart || ''} onChange={onInputPackageDetail} />
                    <label htmlFor='tpdsaleStart'>시작 날짜</label>
                </div>

                <div className='form-floating mb-3'>
                    <input className='form-control' type='text' id='tpdsaleEnd' name='tpdsaleEnd' value={tpdsaleEnd || ''} onChange={onInputPackageDetail} />
                    <label htmlFor='tpdsaleEnd'>종료 날짜</label>
                </div>

                {/* <div className='form-floating mb-3'>
                    <input className='form-control' type='number' id='likeCnt' name='likeCnt' value={likeCnt || ''} readOnly />
                    <label htmlFor='likeCnt'>좋아요 수</label>
                </div> */}

                <button className="btn btn-success m-5" type='button' onClick={tpSeq === '0' ? create : update}>{tpSeq === '0' ? '추가': '수정'}</button>
            </div>

            <div style={{width: '60em'}}>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpdThumbnail} onError={onErrorImg} alt='필수 이미지 링크' />

                <div className='input-group mb-3 mt-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='tpdThumbnail' name='tpdThumbnail' value={tpdThumbnail || ''} onChange={onInputPackageDetail}/>
                        <label htmlFor='tpdThumbnail'>썸네일 이미지 링크</label>
                    </div>
                </div>

                <div className='form-floating mt-3 mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='tpdcontext' name='tpdcontext' value={tpdcontext || ''} onChange={onInputPackageDetail}></textarea>
                    <label htmlFor='tpdcontext'>설명</label>
                </div>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpdImages} onError={onErrorImg} alt='추가 이미지 링크1' />

                <div className='input-group mt-3 mb-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='tpdImages' name='tpdImages' value={tpdImages || ''} onChange={onInputPackageDetail} />
                        <label htmlFor='tpdImages'>추가 이미지 링크</label>
                    </div>
                </div>
{/*            
                <div className='form-floating mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='context2' name='context2' value={context2 || ''} onChange={onInputPackageDetail}></textarea>
                    <label htmlFor='context2'>설명</label>
                </div>

                <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={subImage2} onError={onErrorImg} alt='추가 이미지 링크2' />
                
                <div className='input-group mt-3 mb-3'>
                    <span className='input-group-text'>🖼️</span>
                    <div className='form-floating'>
                        <input className='form-control' type='text' id='subImage2' name='subImage2' value={subImage2 || ''} onChange={onInputPackageDetail} />
                        <label htmlFor='subImage2' >추가 이미지 링크</label>
                    </div>
                </div>

                <div className='form-floating mb-3'>
                    <textarea className="form-control" style={{height: '100px'}} id='context3' name='context3' value={context3 || ''} onChange={onInputPackageDetail}></textarea>
                    <label htmlFor='context3'>설명</label>
                </div> */}

            </div>
        </div>
    );
};

export default AdvisorPackageForm;