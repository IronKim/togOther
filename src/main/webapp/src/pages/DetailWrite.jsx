import React, {  useState } from 'react';


const DetailWrite = ({onInput,inputUserData,nextPage,prevPage}) => {
    
    
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

    return (
        
        <div>
            <table> 

                <tr>
                    <input type="file" onChange={handleFileChange} name='profileImage'/>
                    {imagePreview && <img src={imagePreview} alt="Preview" />}
                </tr>
                <tr>
                    <textarea placeholder='프로필 사진과 소개글을 등록해주세요' name='profileText' rows="4" cols="50" onChange={onInput} value={inputUserData.profileText}></textarea>
                </tr>
                <br/>
                <tr>
                <input
                        type='text'
                        value={inputUserData.tel} // inputUserData.tel 값으로 바인딩
                        onChange={handleNumberChange}
                        name='tel'
                        placeholder="'-'를 제외한 핸드폰 번호"
                    />
                </tr>
            </table>
            <br/>
            <button onClick={()=> prevPage()}>이전</button>&nbsp;
            <button onClick={()=> nextPage()}>다음</button>&nbsp;
        </div>
        
    );
};

export default DetailWrite;

