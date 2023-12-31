import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlaceReviewWrite from './PlaceReviewWrite';
import PlaceReviewUpdate from './PlaceReviewUpdate';
import PlaceReviewPhoto from './PlaceReviewPhoto';
import { getPlaceReviewBySeq, deletePlaceReviewByReviewSeq} from '../../api/PlaceReviewApiService';
import { useUserStore } from '../../stores/mainStore';
import ProfileView from '../ProfileView/ProfileView';
import thumb from '../../assets/image/profile_thumb.png';
import Swal from 'sweetalert2';

const PlaceReview = ({ placeSeq }) => {
  const [selectedPlaceReview, setSelectedPlaceReview] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { user } = useUserStore();
  const userSeq1 = user.userSeq;
  const [reviewLength, setReviewLength]  = useState(0);

  const handleDelete = (reviewSeq) => {
     // 사용자에게 삭제 여부를 확인하는 메시지를 띄웁니다.

     Swal.fire({
      title: '리뷰를 삭제하시겠습니까?',
      text: "삭제된 리뷰는 복구할 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePlaceReviewByReviewSeq(placeSeq, reviewSeq)
         .then(() => {
           // Update the state to remove the deleted review
           setReviewLength(reviewLength-1);
           setSelectedPlaceReview((prevReviews) =>
             prevReviews.filter((review) => review.reviewSeq !== reviewSeq)
           );
           Swal.fire(
            '삭제 완료!',
            '리뷰가 삭제되었습니다.',
            'success'
          );
         })
         .catch((error) => {
           console.error('리뷰 삭제 오류: ', error);
         });
        
      }
    });
    
  };

  const onErrorImg = (e) => {
    e.target.src = thumb;
}

 
const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options).replace(/. /g, '-');
};

  const loadInitialReviews = () => {
    getPlaceReviewBySeq(placeSeq, 1)
      .then(response => {
        setReviewLength(response.data.length);
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
  }, [placeSeq]);

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
      loadReviews(page);
    }
  };

  const loadReviews = (currentPage) => {
    const reviewsPerPage = 5;

    getPlaceReviewBySeq(placeSeq, currentPage)
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
    <div style={{ maxWidth: '728px', minWidth: '60%', margin: '0 auto', width: '100%' }}>
      <div style={{ maxWidth: '728px', width: '100%', display: 'flex', justifyContent: 'space-between', margin: '10px auto' }}>
        <p className="fs-3">리뷰 {reviewLength}</p> 
        {/* {selectedPlaceReview.length} */}
        <p style={{ margin: '0', alignSelf: 'flex-end' }}>
          <PlaceReviewWrite placeSeq={placeSeq} loadInitialReviews={loadInitialReviews}/>
        </p>
      </div>
      {selectedPlaceReview.map((review) => {
        const imageArray = review.image.split(',');
        const user = userProfiles[review.userSeq] || {};
        return (
          <div key={review.reviewSeq} style={{ maxWidth: '728px', width: '100%', display: 'block', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Col xs={6} md={4} style={{ display: 'flex', alignItems: 'center' }}>
                
                <Image
                  src={review.user.profileImage || thumb}
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
                  <div style={{ margin: '10px auto auto 10px', fontSize: '13px', color: 'gray' }}>
                    {formatDateTime(review.date)}
                  </div>
                </div>
              </Col>
              {/* 리뷰 작성자와 현재 로그인한 사용자가 같으면 수정/삭제 버튼 렌더링 */}
              {userSeq1 === review.user.userSeq && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PlaceReviewUpdate
                    reviewSeq={review.reviewSeq}
                    placeSeq={placeSeq}
                    loadInitialReviews={loadInitialReviews}
                  />
                  <span
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
                      maxWidth: '720px',
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
                <div style={{ width: '100%', display: 'flex', margin: 'auto', alignItems: 'center'}}>
                  <div style={{width:'68%',marginRight: '5px'}}>
                    <img
                      src={imageArray[0]}
                      className="rounded mx-auto d-block"
                      alt="..."
                      style={{
                        width: '100%',
                        maxWidth: '486px', // 기존 0번 이미지의 max width
                        height: '290px',
                        maxHeight: '290px',
                        objectFit: 'cover',
                        marginRight: '5px',
                      }}
                      onClick={() => handleImageClick(imageArray[0])}
                    />
                  </div>
                  <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center',width:'30%' }}>
                    <img
                      src={imageArray[1]}
                      className="rounded mx-auto d-block"
                      alt="..."
                      style={{
                        width: '100%',
                        maxWidth: '232px',
                        height: '143px',
                        objectFit: 'cover',
                      
                      }}
                      onClick={() => handleImageClick(imageArray[1])}
                    />
                    <img
                      src={imageArray[2]}
                      className="rounded mx-auto d-block"
                      alt="..."
                      style={{
                        width: '100%',
                        maxWidth: '232px',
                        height: '143px',
                        maxHeight: '254px',
                        objectFit: 'cover',
                        marginTop: '5px',
                        marginRight: '5px',
                      }}
                      onClick={() => handleImageClick(imageArray[2])}
                    />
                  </div>
                </div>
              )}




            </div>
            <hr style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '30px auto', borderWidth: '2px' }} />
          </div>
        );
      })}
      <ProfileView show={modalShow1} onHide={() => setModalShow1(false)} userSeq={userProfiles}/>
      <PlaceReviewPhoto show={modalShow} onHide={() => setModalShow(false)} image={selectedImage} />
    </div>
  );
};
export default PlaceReview;