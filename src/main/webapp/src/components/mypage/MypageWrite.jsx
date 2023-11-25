import React, { useState } from 'react';
import styles from '../../css/MyPage.module.css';
import { useUserStore } from '../../stores/mainStore';
import { updateProfileText } from '../../api/UserApiService';

import { RiSave3Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";


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
                                    <button>비밀번호 변경</button>
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