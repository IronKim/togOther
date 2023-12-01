import React from 'react';
import { addCity, updateCity } from '../../api/AdvisorApiService';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import sweet from 'sweetalert2';    

import styles from '../../css/advisor.module.css';

const AdvisorCityForm = ({selectedCity, onInputCity, getCityList, onErrorImg}) => {

    const {citySeq, continentName, countryName, cityName, cityImage } = selectedCity

    const update = () => {
        updateCity(citySeq, selectedCity)
        .then(res => {
            console.log(res)
            sweet.fire({
                title: "완료되었습니다.",
                icon: "success"
            })
        })
        .catch(e => console.log(e))
        .finally(getCityList);
    }

    const create = () => {
        addCity(selectedCity)
        .then(res => {
            console.log(res.data);
            sweet.fire({
                title: "완료되었습니다.",
                icon: "success"
            })
        })
        .catch(e => console.log(e))
        .finally(getCityList);
    }

    return (
        <div>
            <Formik initialValues={{citySeq, continentName, countryName, cityName, cityImage}}>
                {
                    (props) => (
                        <Form>
                            {/* <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning" /> */}
                            <div className='form-floating mb-3 mt-3'>
                                <Field className='form-control' id='citySeq' type='text' name='citySeq' value={citySeq || ''} readOnly />
                                <label htmlFor='citySeq'>SEQ</label>
                            </div>
                            
                            <div className='form-floating mb-3'>
                                <select className='form-select' id='continentName' name='continentName' value={continentName || ''} onChange={onInputCity} >
                                    <option value=''>대륙 선택</option>
                                    <option value='아시아'>아시아</option>
                                    <option value='북아메리카'>북아메리카</option>
                                    <option value='남아메리카'>남아메리카</option>
                                    <option value='오세아니아'>오세아니아</option>
                                    <option value='유럽'>유럽</option>
                                    <option value='아프리카'>아프리카</option>
                                </select>
                                <label htmlFor='continentName'>대륙</label>
                            </div>
                            
                            <div className='form-floating mb-3'>
                                <Field className='form-control' type='text' id='countryName' name='countryName' value={countryName || ''} onChange={onInputCity} />
                                <label htmlFor='countryName'>나라</label>
                            </div>

                            <div className='form-floating mb-3'>
                                <Field className='form-control' type='text' id='cityName' name='cityName' value={cityName || ''} onChange={onInputCity}  />
                                <label htmlFor='cityName'>도시</label>
                            </div>
                    
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>🖼️</span>
                                <div className='form-floating'>
                                    <Field className='form-control' type='text' id='cityImage' name='cityImage' value={cityImage || ''}  onChange={onInputCity} />
                                    <label htmlFor='cityImage'>도시이미지주소</label>
                                </div>
                            </div>
                      
                            <img className={`${styles.defalutImg} rounded mx-auto d-block`} src={cityImage} alt='도시 대표이미지 ' onError={onErrorImg}/>
                            <button className="btn btn-success m-5 " type='button' onClick={citySeq === '0' ? create : update}>{citySeq === '0' ? '추가': '수정'}</button>
                        </Form>
                        )
                }
                
            </Formik>
        </div>
    );
};

export default AdvisorCityForm;