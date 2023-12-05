import React, { useState } from 'react';
import styles from '../../css/MyPage.module.css';
import { useUserStore } from '../../stores/mainStore';
import { smsCertificationRequest, updateLikingFood, updateLikingTrip, 
    updatePassword, updatePhone, updateProfileText, withdrawalUser, updateMbtiApi, updateProfileImage } from '../../api/UserApiService';

import { RiSave3Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

import Swal from 'sweetalert2'; // SweetAlert2 추가
import { useNavigate } from 'react-router-dom';
import MyMbti from './MyMbti';

import { uploadPlannerImage } from '../../api/PlannerApiService';

const MypageWrite = ({onErrorImg}) => {

    const { user,updateMbti, updatePImage } = useUserStore();

    const navigate = useNavigate();

    const [onMbti,setOnMbti] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedProfileText, setEditedProfileText] = useState(user.profileText);
    let likingFood = user.likingFood; // 음식 취향
    let likingTrip = user.likingTrip; // 여행 취향

    const [year, month, day] = user.birthday.split('-');

    const mbtiClose = () => {
        setOnMbti(false)
    }

    const theEndMbti = (mbti) => {
        updateMbti(mbti)
    }

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
            Swal.fire({
                title: '소개글 변경 실패',
                text: err.response.data,
                icon: 'error',
            });
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
            showCancelButton: true,
            confirmButtonText: '변경',
            cancelButtonText: '취소',
            allowOutsideClick: false,
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
        }
    };

    // 휴대폰 번호 변경
    const phoneChange = async () => {
        let wrongAttempts = 0; // 틀린 횟수를 저장할 변수

        const showInvalidCodeModal = () => {
            Swal.fire({
                icon: 'error',
                title: '인증 오류',
                text: '인증번호를 3번 이상 틀렸습니다. 다시 시도해주세요.',
            });
        };

        const showLoadingodal = () => {
            Swal.fire({
                title: '인증번호 전송 중...',
                allowOutsideClick: false,
                showConfirmButton: false,
                allowEnterKey: false,
                });
        };

        Swal.fire({
            title: '휴대폰 인증',
            input: 'text',
            inputLabel: '전화번호',
            inputPlaceholder: '전화번호를 입력하세요 (숫자만 입력)',
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonText: '전송',
            cancelButtonText: '취소',
            inputAttributes: {
                pattern: '[0-9]{15}', // 여기서 [0-9]는 숫자, {15}는 15자리 숫자를 의미
                maxLength: 15,
              },
            inputValidator: (value) => {
                // 숫자만 허용하는 정규표현식을 사용하여 유효성 검사
                const isValidPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(value);

                if(user.phone === value) {
                    return '현재 사용중인 전화번호입니다.';
                }
            
                if (!isValidPhoneNumber) {
                  return '유효하지 않은 전화번호입니다.';
                }


                return undefined; // 유효성 검사 통과
              },
              
          }).then((phoneNumberResult) => {
            if (phoneNumberResult.isConfirmed) {
              const phoneNumber = phoneNumberResult.value;

              showLoadingodal();

              smsCertificationRequest(phoneNumber)
                .then(res => {
                    console.log(res.data);   
                    Swal.fire({
                        title: '휴대폰 인증',
                        text: `${phoneNumber}로 인증번호가 전송되었습니다.`,
                        input: 'text',
                        inputLabel: '인증번호',
                        inputPlaceholder: '인증번호를 입력하세요',
                        showCancelButton: true,
                        allowOutsideClick: false,
                        inputAttributes: {
                            pattern: '[0-9]{6}', // 여기서 [0-9]는 숫자, {6}는 6자리 숫자를 의미
                            maxLength: 6,
                          },
                          inputValidator: (value) => {
                            // 입력된 값이 서버 응답과 일치하는지 확인
                            if (Number(value) === Number(res.data)) {
                                return undefined; // 유효성 검사 통과
                            } else {
                                wrongAttempts++; // 틀린 횟수 증가
                                if (wrongAttempts >= 3) {
                                    return undefined;
                                } else {
                                    return '인증번호가 일치하지 않습니다. 남은시도 횟수: ' + (3 - wrongAttempts) + '회';
                                }
                            }
                        },
                        confirmButtonText: '확인',
                        cancelButtonText: '취소',
                      }).then((verificationCodeResult) => {
                        if (verificationCodeResult.isConfirmed) {

                            if(Number(verificationCodeResult.value) !== Number(res.data)) {
                                showInvalidCodeModal();
                                return;
                            }


                            updatePhone(user.userSeq, phoneNumber)
                            .then((response) => {
                                user.phone = phoneNumber;
                                    Swal.fire({
                                        title: '휴대폰번호 변경 성공',
                                        icon: 'success',
                                        showConfirmButton: false,
                                    });
                                window.location.reload();
                            })
                            .catch((error) => {
                                Swal.fire({
                                    title: '휴대폰번호 변경 실패',
                                    text: error.response.data,
                                    icon: 'error',
                                });
                            });  
                        }
                      });
                })
                .catch(e => {
                    if(e.response.status === 409) {
                        Swal.fire({
                            icon: 'error',
                            title: '이미 가입된 회원입니다.',
                            });
                    }
                });
            }
          });
    };

    // 회원 탈퇴
    const withdrawal = () => {
        Swal.fire({
            title: '회원 탈퇴',
            text: '정말 탈퇴하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소',
            allowOutsideClick: false,
            }).then((result) => {
            if (result.isConfirmed) {

                withdrawalUser(user.userSeq)
                .then((response) => {
                    Swal.fire({
                        title: '회원 탈퇴',
                        text: '탈퇴가 완료되었습니다.',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: '회원 탈퇴 실패',
                        text: error.response.data,
                        icon: 'error',
                    });
                })
                .finally(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/');
                    window.location.reload();
                });          
            }
        });
    };

    const likingFoodChange = () => {
        Swal.fire({
            title: '음식 취향 변경',
            html:
                `
                <div>
                    <div>
                        <p class='tagP'>(다중선택가능)</p>
                    </div>
        
                    <p>여행은 술과 함께 즐겨요🍷&nbsp;<input type='checkbox' value='펍' ${likingFood?.includes('펍') ? 'checked' : ''} /></p>
                    <p>달달한 디저트를 즐겨 먹어요🥐&nbsp;<input type='checkbox' value='디저트' ${likingFood?.includes('디저트') ? 'checked' : ''} /></p>
                    <p>한식없이는 못 살아요~🍚&nbsp;<input type='checkbox'  value='한식' ${likingFood?.includes('한식') ? 'checked' : ''} /></p>
                    <p>분위기 좋게 양식?🍝&nbsp;<input type='checkbox' value='양식' ${likingFood?.includes('양식') ? 'checked' : ''} /></p>
                    <p>니하오?중식!&nbsp;🥮<input type='checkbox' value='중식'  ${likingFood?.includes('중식') ? 'checked' : ''} /></p>
                    <p>초밥 등 일식은 어때?&nbsp;🍣<input type='checkbox'  value='일식' ${likingFood?.includes('일식') ? 'checked' : ''} /></p>
                    <p>현지에서는 로컬음식과 함께!🌮&nbsp;<input type='checkbox'  value='로컬' ${likingFood?.includes('로컬') ? 'checked' : ''} /></p>
                    <p>저는 비건입니다~🥬&nbsp;<input type='checkbox' value='비건' ${likingFood?.includes('비건') ? 'checked' : ''} /> </p>
                    <p>저는 육식공룡이에요!🍖&nbsp;<input type='checkbox'  value='육류' ${likingFood?.includes('육류') ? 'checked' : ''} /></p>
                    <p>바닷속의 맛! 해산물 마니아! &nbsp;🦪<input type='checkbox' value='해산물' ${likingFood?.includes('해산물') ? 'checked' : ''} /></p>
                    <p>후루룩~! 면을 좋아해요~🍜&nbsp;<input type='checkbox' value='면류' ${likingFood?.includes('면류') ? 'checked' : ''} /></p>
                    <p>한국사람은 밥심!&nbsp;🥘<input type='checkbox'  value='밥류' ${likingFood?.includes('밥류') ? 'checked' : ''} /></p>
                    <p>국이 없으면 수저를 들지않아요!🍲&nbsp;<input type='checkbox'  value='국류' ${likingFood?.includes('국류') ? 'checked' : ''} /></p>
                    <p>무엇이든 상관 없이 잘 먹지요~😋&nbsp;<input type='checkbox' value='기타'${likingFood?.includes('기타') ? 'checked' : ''} /></p>
                </div>`,
            showCancelButton: true,
            confirmButtonText: '변경',
            cancelButtonText: '취소',
            allowOutsideClick: false,
            didOpen: (modalElement) => {
                
                const allPTags = modalElement.querySelectorAll('p');
                const allcheckbox = modalElement.querySelectorAll('input[type="checkbox"]');
                

                allcheckbox.forEach((checkbox) => {
                    checkbox.style.transform = 'scale(1.5)';

                    checkbox.addEventListener('change', () => {
                        
                        const updatedFood = updateCheckboxValue(likingFood, checkbox.value);

                        likingFood = updatedFood;

                    });
                });

                if (window.innerWidth <= 1199) {
                    // 화면 폭이 1199px 이하인 경우에만 적용되는 스타일 설정
                    allPTags.forEach((pTag) => {
                        pTag.style.fontSize = '21px';
                    });
                }else {
                    allPTags.forEach((pTag) => {
                        pTag.style.fontSize = '30px';
                        pTag.style.marginTop = '2px';
                        
                      });
                }

                modalElement.querySelector('.tagP').style.fontSize = '40px';
              },
            }).then((result) => {
            if (result.isConfirmed) {
                user.likingFood = likingFood;
                
                updateLikingFood(user.userSeq, likingFood)
                .then((response) => {
                    Swal.fire({
                        title: '음식 취향 변경 성공',
                        icon: 'success',
                        showConfirmButton: false,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: '음식 취향 변경 실패',
                        text: error.response.data,
                        icon: 'error',
                    });
                });
            }else {
                likingFood = user.likingFood;
            }
        });
    }

    const likingTripChange = () => {
        Swal.fire({
            title: '여행 취향 변경',
            html:
                `          
                <div>
                    <div>
                        <p class='tagP'>(다중선택가능)</p>
                    </div>
        
                    <p>자연에서 느끼는 힐링~🌱&nbsp;<input type='checkbox' value='자연' ${likingTrip?.includes('자연') ? 'checked' : ''} /></p>
                    <p>각지의 문화를 느껴요&nbsp;🧑‍🤝‍🧑&nbsp;<input type='checkbox' value='문화' ${likingTrip?.includes('문화') ? 'checked' : ''} /></p>
                    <p>여행은 무조건 푹 쉬어야지요😴&nbsp;<input type='checkbox'  value='휴양' ${likingTrip?.includes('휴양') ? 'checked' : ''} /></p>
                    <p>미술,전시를 즐기는 문화인🖼️&nbsp;<input type='checkbox' value='전시' ${likingTrip?.includes('전시') ? 'checked' : ''} /></p>
                    <p>쇼핑하며 플렉스!&nbsp;🎁<input type='checkbox' value='쇼핑'  ${likingTrip?.includes('쇼핑') ? 'checked' : ''} /></p>
                    <p>핫플만 찾아 다니는 인싸!🎉<input type='checkbox'  value='핫플' ${likingTrip?.includes('핫플') ? 'checked' : ''} /></p>
                    <p>액티비티 좋아하시나요..?🥽&nbsp;<input type='checkbox'  value='활동' ${likingTrip?.includes('활동') ? 'checked' : ''} /></p>
                    <p>신나는 놀이기구를 타볼까요?🎪&nbsp;<input type='checkbox' value='테마' ${likingTrip?.includes('테마') ? 'checked' : ''} /> </p>
                </div>`,
            showCancelButton: true,
            confirmButtonText: '변경',
            cancelButtonText: '취소',
            allowOutsideClick: false,
            didOpen: (modalElement) => {
                
                const allPTags = modalElement.querySelectorAll('p');
                const allcheckbox = modalElement.querySelectorAll('input[type="checkbox"]');
                

                allcheckbox.forEach((checkbox) => {
                    checkbox.style.transform = 'scale(1.5)';

                    checkbox.addEventListener('change', () => {
                        
                        const updatedTrip = updateCheckboxValue(likingTrip, checkbox.value);

                        likingTrip = updatedTrip;

                    });
                });

                if (window.innerWidth <= 1199) {
                    // 화면 폭이 1199px 이하인 경우에만 적용되는 스타일 설정
                    allPTags.forEach((pTag) => {
                        pTag.style.fontSize = '21px';
                    });
                }else {
                    allPTags.forEach((pTag) => {
                        pTag.style.fontSize = '30px';
                        pTag.style.marginTop = '2px';
                        
                      });
                }

                modalElement.querySelector('.tagP').style.fontSize = '40px';
              },
            }).then((result) => {
            if (result.isConfirmed) {
                user.likingTrip = likingTrip;
                
                updateLikingTrip(user.userSeq, likingTrip)
                .then((response) => {
                    Swal.fire({
                        title: '여행 취향 변경 성공',
                        icon: 'success',
                        showConfirmButton: false,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: '여행 취향 변경 실패',
                        text: error.response.data,
                        icon: 'error',
                    });
                });
            }else {
                likingTrip = user.likingTrip;
            }
        });
    }

    // 중복된 값을 처리하고 업데이트
    const updateCheckboxValue = (existingValues, value) => {
        const values = existingValues ? existingValues.split(',') : [];

        // 중복 값이 이미 있는지 확인
        if (values.includes(value)) {
            // 이미 있는 경우 해당 값 제거
            const updatedValues = values.filter((v) => v !== value);
            return updatedValues.join(',');
        } else {
            // 중복되지 않는 경우 추가
            const updatedValues = [...values, value];
            return updatedValues.join(',');
        }
    };

    const uploadAndSetProfileImage = (file) => {
        const formData = new FormData();
        formData.append('files', file);
    
        // 오브젝트 스토리지에 이미지 업로드
        uploadPlannerImage(formData)
            .then((response) => {
                // 이미지 업로드 성공 시 업로드된 이미지 정보를 받아옴 (response에는 이미지 링크 또는 정보가 있어야 함)
                const uploadedImageUrl = response.data; // 이미지 링크가 있다고 가정함
    
                // 서버에 프로필 이미지 업데이트 요청
                updateProfileImage(user.userSeq, uploadedImageUrl)
                    .then((response) => {
                        Swal.fire({
                            title: '프로필 이미지 변경 성공',
                            icon: 'success',
                            showConfirmButton: false,
                        });
                        // 사용자의 프로필 이미지 업데이트
                        updatePImage(uploadedImageUrl);
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: '프로필 이미지 변경 실패',
                            text: error.response.data,
                            icon: 'error',
                        });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: '이미지 업로드 실패',
                    text: error.response.data,
                    icon: 'error',
                });
            });
    };
    
    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        uploadAndSetProfileImage(file);
    };
    
    // 파일 선택을 위한 input 엘리먼트 생성 및 핸들러 연결
    const openFileSelector = () => {

        Swal.fire({
            title: '프로필 이미지 수정',
            text: '이미지를 업로드하거나 기본 이미지로 변경할 수 있습니다.',
            showCancelButton: true,
            cancelButtonText: '기본 이미지로 변경',
            confirmButtonText: '이미지 업로드',
            reverseButtons: false,
    
        }).then((result) => {
            if(result.isConfirmed) {
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = handleImageUpload;
                input.click();
            }
            if (result.dismiss === Swal.DismissReason.cancel) {
                // 기본 이미지로 변경
                if(user.profileImage !== null && user.profileImage !== '') {

                updateProfileImage(user.userSeq, '')
                .then((response) => {
                    Swal.fire({
                        title: '프로필 이미지 변경 성공',
                        icon: 'success',
                        showConfirmButton: false,
                    });
                    // 사용자의 프로필 이미지 업데이트
                    updatePImage('');

                })
            }

            }
        });

    };

    return (
        <div>
            {
                onMbti && <MyMbti inputUserData={user} mbtiClose={mbtiClose} updateMbti={updateMbtiApi} theEndMbti={theEndMbti}/>
            }
                <p className={styles.tagName}>계정설정</p>
                <hr className={styles.hr} />
                <div className={ styles.writeForm }>
                    <div style={{display: 'flex', flexDirection: 'column', height: '13em'}}>
                        <div className={ styles.photo_mbti }>
                            <div className={ styles.photo }>
                                <img onClick={openFileSelector} src={ user.profileImage === null ? '' : user.profileImage.toString() } 
                                    className={styles.PImage} onError={onErrorImg} />
                            </div>
                            <p className={ styles.nameInput } style={{fontSize: '30px', width : '100%', height : '45px', textAlign: 'center' }} >{user.name}</p>
                            {user &&
                            <div className={ styles.mbti }>
                                {
                                    user.mbti === '' || user.mbti === null ? <span>MBTI가 없습니다.</span> : <span>{user.mbti}</span>
                                }
                            </div>
                            } {/* styles.mbti */}
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
                                    <button onClick={phoneChange}>{user.phone === '' || user.phone === null ? '휴대폰 인증하기' : '휴대폰번호 변경'}</button>
                                    <button onClick={likingTripChange}>여행취향 변경</button>
                                    <button onClick={likingFoodChange}>음식취향 변경</button>
                                    <button onClick={() => setOnMbti(true)}>mbti 테스트</button>
                                    <button onClick={withdrawal}>회원탈퇴</button>
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