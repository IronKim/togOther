import React from 'react';
import { addPackage, updatePackage } from '../../api/AdvisorApiService';
import { Field, Form, Formik } from 'formik';

import styles from '../../css/advisor.module.css';


const AdvisorPackageForm = ({selectedPackage, onInputPackage, getpackageList, onErrorImg, }) => {

    const { tpSeq, citySeq, tpTitle, tpThumbnail, tpPrice } = selectedPackage

    const update = () => {
        updatePackage(tpSeq, selectedPackage)
        .then(res => {
            console.log(res)
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getpackageList);
    }

    const create = () => {
        addPackage(selectedPackage)
        .then(res => {
            console.log(res.data);
            alert('완료');
        })
        .catch(e => console.log(e))
        .finally(getpackageList);
    }

    return (
        <div>
            <Formik initialValues={{ tpSeq, citySeq, tpTitle, tpThumbnail, tpPrice }}>
                {
                    (props) => (
                        <Form>
                            {/* <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning" /> */}
                            <div className='form-floating mb-3 mt-3'>
                                <Field className='form-control' id='tpSeq' type='text' name='tpSeq' value={tpSeq || ''} readOnly />
                                <label htmlFor='tpSeq'>SEQ</label>
                            </div>
                            
                            <div className='form-floating mb-3'>
                                <Field className='form-control' type='text' id='tpTitle' name='tpTitle' value={tpTitle || ''} onChange={onInputPackage} />
                                <label htmlFor='tpTitle'>패키지 제목</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <Field className='form-control' type='text' id='tpPrice' name='tpPrice' value={tpPrice || ''} onChange={onInputPackage}  />
                                <label htmlFor='tpPrice'>패키지 가격</label>
                            </div>

                            <div className='input-group mb-3'>
                                <span className='input-group-text'>🖼️</span>
                                <div className='form-floating'>
                                    <Field className='form-control' type='text' id='tpThumbnail' name='tpThumbnail' value={tpThumbnail || ''}  onChange={onInputPackage} />
                                    <label htmlFor='tpThumbnail'>패키지 섬네일주소</label>
                                </div>
                            </div>
                      
                            <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={tpThumbnail} alt='패키지 섬네일' onError={onErrorImg}/>
                            <button className="btn btn-success m-5 " type='button' onClick={tpSeq === '0' ? create : update}>{tpSeq === '0' ? '추가': '수정'}</button>
                        </Form>
                        )
                }
                
            </Formik>
        </div>
    );
};

export default AdvisorPackageForm;