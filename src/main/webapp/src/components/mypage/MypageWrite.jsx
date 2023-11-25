import React, { useState } from 'react';
import styles from '../../css/MyPage.module.css';
import { useUserStore } from '../../stores/mainStore';
import { updatePassword, updateProfileText } from '../../api/UserApiService';

import { RiSave3Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

import Swal from 'sweetalert2'; // SweetAlert2 추가


const MypageWrite = ({onErrorImg}) => {

    const { user } = useUserStore();

    const [isEditing, setEditing] = useState(false);
    const [editedProfileText, setEditedProfileText] = useState(user.profileText);

    const [year, month, day] = user.birthday.split('-');

    const handleToggleEdit = () => {
        setEditing(!isEditing);
        // 토글 시 수정 중이면 현재 소개글로 복원, 아니면 현재 수정 중인 소개글로 설정
        if (isEditing) {
            setEditedProfileText(user.profileText);
        } else {
            setEditedProfileText(user.profileText);
        }
    };

    const handleSave = () => {

        setEditing(false); // 저장 후 수정 모드 종료

        if(user.profileText === editedProfileText) {
            return;
        }

        updateProfileText(user.userSeq, editedProfileText)
        .then((res) => {
            user.profileText = editedProfileText;
        })
        .catch((err) => {
            console.log(err);
        });

        
    };

    // 마이페이지 비밀번호 변경
    const passwordChange = async () => {
        const { value: formValues } = await Swal.fire({
            title: '비밀번호 변경',
            html:
                '<input type="password" id="currentPassword" class="swal2-input" placeholder="현재 비밀번호">' +
                '<input type="password" id="newPassword" class="swal2-input" placeholder="새로운 비밀번호 (4~20글자)">' +
                '<input type="password" id="confirmPassword" class="swal2-input" placeholder="비밀번호 확인">',
            focusConfirm: false,
            preConfirm: () => {
                const currentPassword = Swal.getPopup().querySelector('#currentPassword').value;
                const newPassword = Swal.getPopup().querySelector('#newPassword').value;
                const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
    
                // 각 입력 필드의 값이 비어있는지 확인
                if (!currentPassword || !newPassword || !confirmPassword) {
                    Swal.showValidationMessage('모든 항목을 입력하세요.');
                    return false;
                }
    
                // 새로운 비밀번호와 확인 비밀번호가 일치하지 않는지 확인
                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                    return false;
                }

                // 새로운 비밀번호가 최소 4글자 이상이고 최대 20글자 이하인지 확인
                if (newPassword.length < 4 || newPassword.length > 20) {
                    Swal.showValidationMessage('비밀번호는 4글자 이상 20글자 이하로 입력하세요.');
                    return false;
                }
    
                // 서버에게 비밀번호 변경 요청을 보내는 비동기 처리 (여기서는 가정)
                return updatePassword(user.userSeq, currentPassword, newPassword)
                        .then((response) => {
                         
                            // 성공 메시지 처리
                            Swal.fire({
                                title: '비밀번호 변경 성공',
                                text: response.data,
                                icon: 'success',
                            });
                            return true;
                        })
                        .catch((error) => {
                            Swal.fire({
                                title: '비밀번호 변경 실패',
                                text: error.response.data,
                                icon: 'error',
                            });
                            return false;
                        });
                
            },
        });
    
        if (formValues) {
            Swal.fire('비밀번호가 변경되었습니다.', '', 'success');
        } else {
            Swal.fire('비밀번호 변경이 취소되었습니다.', '', 'info');
        }
    };

    return (
        <div>
                <p className={styles.tagName}>계정관리</p>
                <hr className={styles.hr} />
                <div className={ styles.writeForm }>
                    <div style={{display: 'flex', flexDirection: 'column', height: '13em'}}>
                        <div className={ styles.photo_mbti }>
                            <div className={ styles.photo }>
                                <img src={ user.profileImage === null ? '' : user.profileImage.toString()} style={{ width: '95px', height : '95px' }} onError={onErrorImg} />
                            </div>
                            <p className={ styles.nameInput } style={{fontSize: '30px', width : '100%', height : '45px', textAlign: 'center' }} >{user.name}</p>
                            <div className={ styles.mbti }>
                                {
                                    user.mbti === '' || user.mbti === null ? <span>MBTI가 없습니다.</span> : <span>{user.mbti}</span>
                                }
                            </div> {/* styles.mbti */}
                        </div>
                    </div>

                <div className={ styles.textdiv }>
                    {
                        user.certification === 1 ? 
                            <p style={{fontSize: '30px', marginTop: '20px'}}> <FaUserCheck style={{color: 'blue'}} /> 인증된 회원입니다</p> :
                            <p style={{fontSize: '30px', marginTop: '20px'}}> <FaUserTimes style={{color: 'red'}} /> 인증되지 않은 회원입니다</p>
                    }
                    
                    <div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width:'80%',margin:'80px auto auto auto', marginTop: '80px'}}>
                                <h3 style={{ fontSize: '2em', textAlign: 'left'}}>소개글</h3>
                                <div style={{ marginTop: '10px' }}>
                                    {isEditing && <RiSave3Fill style={{marginRight: '5'}} className={styles.btn} fontSize={30} onClick={handleSave} /> }
                                    {
                                        isEditing ? <GiCancel onClick={handleToggleEdit} className={styles.btn} fontSize={30} /> : <FaPen onClick={handleToggleEdit}  className={styles.btn} fontSize={25} />
                                    }
                                </div>
                            </div>

                            {isEditing ? (
                                <textarea
                                    className={styles.text1}
                                    placeholder='소개글을 입력해주세요. (2000자 이내)'
                                    value={editedProfileText}
                                    maxLength='2000'
                                    onChange={(e) => setEditedProfileText(e.target.value)}
                                ></textarea>
                            ) : (
                                <textarea className={styles.text1} maxLength='2000' value={editedProfileText} readOnly></textarea>
                            )}
                            
                        </div>

                        <div style={{ width:'100%',margin:'80px auto auto auto', marginTop: '60px', marginBottom: '20px'}} >
                            <h3 style={{margin: '0 auto', width: '80%', fontSize: '2em', textAlign: 'center'}}>회원 정보</h3>
                            <div className={styles.dataDiv}>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>이메일</p>
                                    <p style={{fontSize: '1.8em'}}>{user.email}</p>
                                </div>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>휴대폰번호</p>
                                    {
                                        user.phone === '' || user.phone === null ? <p style={{fontSize: '1.8em'}}>휴대폰 번호가 없습니다.</p> : <p style={{fontSize: '1.8em'}}>{user.phone}</p>
                                    }
                                </div>
                            </div>

                            <div style={{width: '80%'}} className={ styles.inputdiv }>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>태어난 연도</p>
                                    <p className={styles.input}>{year}</p>
                                </div>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>월</p>
                                    <p className={styles.input}>{month}</p>
                                </div>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>일</p>
                                    <p className={styles.input}>{day}</p>
                                </div>
                                <div>
                                    <p style={{ marginTop: '3.5px', fontSize: '25px' }}>성별</p>
                                    <p className={styles.input}>{user.gender === "M" ? "남자" : "여자"}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className={ styles.change }>
                            <ul>
                                <li>
                                    <button onClick={passwordChange}>비밀번호 변경</button>
                                    <button>휴대폰번호 변경</button>
                                    <button>여행취향 변경</button>
                                    <button>음식취향 변경</button>
                                    <button>mbti 테스트</button>
                                    <button>회원탈퇴</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> {/* textdiv */}
            </div>
        </div>
    );
};

export default MypageWrite;