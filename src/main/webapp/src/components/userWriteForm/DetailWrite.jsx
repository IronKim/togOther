import React, {  useRef, useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';


const DetailWrite = ({onInput,inputUserData,nextPage,styles}) => {
    
    const [imagePreview, setImagePreview] = useState(inputUserData.profileImage || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 업로드된 파일

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target.result; // 파일을 Base64로 인코딩된 문자열로 얻습니다.
                setImagePreview(base64String); // 이미지 프리뷰로 설정합니다.
                onInput({ target: { name: 'profileImage', value: base64String } }); // profileImage 업데이트
            };

            reader.readAsDataURL(file); // 파일을 읽고 Base64로 변환합니다.
        }
    };

    const imageInput = useRef();
    
    // 버튼클릭시 input태그에 클릭이벤트를 걸어준다. 
    const onCickImageUpload = () => {
    imageInput.current.click();
    };

    return (
        
        <div className={styles.writeContainer}>
            <div> 

                    {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview}/>}
                <div>
                    <button onClick={onCickImageUpload} className={styles.input_file_button}>프로필 사진 등록</button>
                    <input type="file" onChange={handleFileChange} name='profileImage'  style={{ display: "none" }} ref={imageInput}/>
                </div>
                <div>
                    <textarea placeholder='프로필 사진과 소개글을 등록해주세요' name='profileText' rows="10" cols="40" onChange={onInput} value={inputUserData.profileText} className={styles.inputField}></textarea>
                </div>
            </div>
            <br/>
            <button className={styles.fbtn} onClick={()=> nextPage()}><HiArrowCircleRight/></button>&nbsp;
        </div>
        
    );
};

export default DetailWrite;

