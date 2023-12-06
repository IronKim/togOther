import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlaceReviewUpdate from '../Info/PlaceReviewUpdate';
import PlaceReviewPhoto from '../Info/PlaceReviewPhoto';
import { getPlaceReviewByUserSeq, deletePlaceReviewByReviewSeq} from '../../api/PlaceReviewApiService';
import { useUserStore } from '../../stores/mainStore';
import ProfileView from '../ProfileView/ProfileView';
import styles from '../../css/MypageReview.module.css';

import efault from '../../css/MyPage.module.css';

const MypageReview = ({onErrorImg}) => {
  const [selectedPlaceReview, setSelectedPlaceReview] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { user } = useUserStore();
  const userSeq1 = user.userSeq;
  const handleDelete = (reviewSeq) => {
     // 사용자에게 삭제 여부를 확인하는 메시지를 띄웁니다.
     const shouldDelete = window.confirm("리뷰를 삭제하시겠습니까?");

     if (shouldDelete) {
       // 사용자가 확인하면 삭제 작업을 진행합니다.
       deletePlaceReviewByReviewSeq(reviewSeq)
         .then(() => {
           // Update the state to remove the deleted review
           setSelectedPlaceReview((prevReviews) =>
             prevReviews.filter((review) => review.reviewSeq !== reviewSeq)
           );
         })
         .catch((error) => {
           console.error('리뷰 삭제 오류: ', error);
         });
     }
  };
  const navigate = useNavigate();
  const onToPlacePage = (placeSeq) => {
    navigate(`/info/place/${placeSeq}`);
}
 
const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options).replace(/. /g, '-');
};

  const loadInitialReviews = () => {
    getPlaceReviewByUserSeq(user.userSeq, 1)
      .then(response => {
        const sortedReviews = response.data.sort((a, b) => a.reviewSeq - b.reviewSeq);
        const initialReviews = sortedReviews.slice(0, 5);
        setSelectedPlaceReview(initialReviews);
        setPage(2);
        if (initialReviews.length < 5) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('장소 세부 정보 가져오기 오류: ', error);
      });
  };

  useEffect(() => {
    loadInitialReviews();
  }, [user.userSeq]);

  const handleProfileClick = (user1) => {
    setUserProfiles(user1);
    setModalShow1(true);
  };



  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  const handleScroll = () => {
    if (hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
     //   if (hasMore && window.innerWidth >= 1200 && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      loadReviews(page);
    }
  };

  const loadReviews = (currentPage) => {
    const reviewsPerPage = 5;

    getPlaceReviewByUserSeq(user.userSeq, currentPage)
      .then(response => {
        const sortedReviews = response.data.sort((a, b) => a.reviewSeq - b.reviewSeq);
        const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        const newReviews = sortedReviews.slice(startIndex, endIndex);

        setSelectedPlaceReview(prevReviews => [...prevReviews, ...newReviews]);
        setPage(currentPage + 1);

        if (newReviews.length < reviewsPerPage) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('장소 세부 정보 가져오기 오류: ', error);
      });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, hasMore]);
  return (
    <div className={styles.MypageReview1}>
          <p className={efault.tagName}>여행 후기</p>
          <hr  />
      {selectedPlaceReview.map((review) => {
        const imageArray = review.image.split(',');
        const user = userProfiles[review.userSeq] || {};
        return (
          <div key={review.reviewSeq}  style={{width: '95%', display: 'block', margin: 'auto' }}>
            <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div onClick={() => onToPlacePage(review.placeSeq)} className={styles.div1}>
              <Col xs={6} md={4} style={{ display: 'flex', alignItems: 'center' }}>
                
                <Image
                  src={review.user.profileImage}
                  roundedCircle
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => handleProfileClick(review.user.userSeq)}
                  onError={onErrorImg}
                />
                
                <div style={{ flex: 1 }}>
                  <div
                    className="fw-bolder"
                    style={{
                      margin: '10px auto auto 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{review.user.id || '알 수 없는 사용자'}</span>
                  </div>
                  <div style={{ margin: '10px auto auto 10px', fontSize: '13px', color: 'gray',width:'120px' }}>
                    {formatDateTime(review.date)}
                  </div>
                </div>
              </Col>
              </div>
              {/* 리뷰 작성자와 현재 로그인한 사용자가 같으면 수정/삭제 버튼 렌더링 */}
              {userSeq1 === review.user.userSeq && (
                <div style={{ display: 'flex', alignItems: 'center',width: '100px' }}>
                  <PlaceReviewUpdate
                    reviewSeq={review.reviewSeq}
                    placeSeq={review.placeSeq}
                    loadInitialReviews={loadInitialReviews}
                  />
                  <span
                  className={styles.delete}
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={() => handleDelete(review.reviewSeq)}
                  >
                    / 삭제
                  </span>
                </div>
              )}
            </div>

            <div className="fs-6" style={{ width: '100%', display: 'block', margin: '10px auto', lineHeight: '1.5' }}>
              {review.context}
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            


              {review.image !== 'false' && imageArray.length === 1 && (
                <div style={{ flex: '1' }}>
                  <img
                    src={imageArray[0]}
                    className="rounded mx-auto d-block"
                    alt="..."
                    style={{
                      height: 'auto',
                      maxHeight: '290px',
                      width: '100%',
                      maxWidth: '800px',
                      display: 'block',
                      margin: 'auto 5px',
                      transition: 'width 0.5s',
                      objectFit: 'cover'
                    }}
                    onClick={() => handleImageClick(imageArray[0])}
                  />
                </div>
              )}

              {imageArray.length === 2 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',width:'100%' }}>
                    <div style={{ marginRight: '5px', flex: 1,width:'50%'}}>
                      <img
                        src={imageArray[0]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{
                          width: '100%', // 이미지의 너비를 부모 div에 맞춤
                          height: '290px',
                          objectFit: 'cover', // 이미지를 부모 div에 맞추고 비율 유지
                        }}
                        onClick={() => handleImageClick(imageArray[0])}
                      />
                    </div>
                    <div style={{ flex: 1 ,width:'50%'}}>
                      <img
                        src={imageArray[1]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{
                          width: '100%', // 이미지의 너비를 부모 div에 맞춤
                          height: '290px',
                          objectFit: 'cover', // 이미지를 부모 div에 맞추고 비율 유지
                        }}
                        onClick={() => handleImageClick(imageArray[1])}
                      />
                    </div>
                  </div>
                </>
              )}




            {imageArray.length === 3 && (
    <div style={{ width: '100%', display: 'flex', margin: '0 auto', alignItems: 'center' }}>
        {imageArray.map((image, index) => (
            <img
                key={index}
                src={image}
                className="rounded mx-auto d-block"
                alt="..."
                style={{
                    width: '32.7%', // Divide the width equally for three images
                    height: '290px',
                    objectFit: 'cover',
                    marginRight: index < imageArray.length - 1 ? '3px' : '0', // Add margin only between images
                    
                }}
                onClick={() => handleImageClick(image)}
            />
        ))}
    </div>
)}






            </div>
            <hr style={{ width: '95%',  display: 'block', margin: '30px auto', borderWidth: '2px' }} />
          </div>
        );
      })}
      <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={userProfiles}/>
      <PlaceReviewPhoto show={modalShow} onHide={() => setModalShow(false)} image={selectedImage} />
    </div>
  );
};
export default MypageReview;