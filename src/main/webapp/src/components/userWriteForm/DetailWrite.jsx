import React, {  useRef, useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import { HiArrowCircleLeft } from 'react-icons/hi';


const DetailWrite = ({onInput,inputUserData,nextPage,prevPage,styles}) => {
    
    
    //const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(inputUserData.profileImage || null);

//     const handleFileChange = (e) => {
//     const file = e.target.files[0]; // 업로드된 파일

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             const base64String = e.target.result; // 파일을 Base64로 인코딩된 문자열로 얻습니다.
//             setImagePreview(base64String); // 이미지 프리뷰로 설정합니다.
//         };

//       reader.readAsDataURL(file); // 파일을 읽고 Base64로 변환합니다.
//     }
//   };
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

    const handleNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(value) && value.length <= 15) {
        onInput({ target: { name: 'tel', value: value } }); // inputUserData 업데이트
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

                <div>
                    <button onClick={onCickImageUpload} className={styles.input_file_button}>프로필 사진 등록</button>
                    <input type="file" onChange={handleFileChange} name='profileImage'  style={{ display: "none" }} ref={imageInput}/>
                </div>
                    {imagePreview && <img src={imagePreview} alt="Preview" />}
                <div>
                    <textarea placeholder='프로필 사진과 소개글을 등록해주세요' name='profileText' rows="5" cols="40" onChange={onInput} value={inputUserData.profileText} className={styles.inputField}></textarea>
                </div>
                <br/>
                <div>
                <input
                        type='text'
                        value={inputUserData.tel} // inputUserData.tel 값으로 바인딩
                        onChange={handleNumberChange}
                        name='tel'
                        placeholder="'-'를 제외한 핸드폰 번호"
                        className={styles.inputField}
                    />
                </div>
            </div>
            <br/>
            <button className={styles.fbtn} onClick={()=> prevPage()}><HiArrowCircleLeft/></button>&nbsp;
            <button className={styles.fbtn} onClick={()=> nextPage()}><HiArrowCircleRight/></button>&nbsp;
        </div>
        
    );
};

export default DetailWrite;

