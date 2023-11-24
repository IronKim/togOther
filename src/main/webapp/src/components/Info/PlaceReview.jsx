import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlaceReviewWrite from './PlaceReviewWrite';
import PlaceReviewPhoto from './PlaceReviewPhoto';
import { getPlaceReviewBySeq } from '../../api/PlaceReviewApiService';

const PlaceReview = ({ placeSeq }) => {
  const [selectedPlaceReview, setSelectedPlaceReview] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialReviews = () => {
    getPlaceReviewBySeq(placeSeq, 1)
      .then(response => {
        const sortedReviews = response.data.sort((a, b) => a.reviewSeq - b.reviewSeq);
        const initialReviews = sortedReviews.slice(0, 3);
        setSelectedPlaceReview(initialReviews);
        setPage(2);
        if (initialReviews.length < 3) {
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

  const loadReviews = (currentPage) => {
    if (!hasMore) return;

    const reviewsPerPage = 3;

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadReviews(page);
    }
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
        <p className="fs-3">리뷰 {selectedPlaceReview.length}</p>
        <p style={{ margin: '0', alignSelf: 'flex-end' }}>
          <PlaceReviewWrite placeSeq={placeSeq} />
        </p>
      </div>

      {selectedPlaceReview.map((review) => {
        const imageArray = review.image.split(',');

        return (
          <div key={review.reviewSeq} style={{ maxWidth: '728px', width: '100%', display: 'block', margin: 'auto' }}>
            <Col xs={6} md={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1280,w_1280/67d63e89-7296-43d2-838c-b314fc6903b7.jpeg"
                roundedCircle
                style={{ width: '40px', height: '40px' }}
              />
              <div>
                <div className="fw-bolder" style={{ margin: '10px auto auto 10px' }}>
                  작성자
                </div>
                <div style={{ margin: '10px auto auto 10px', fontSize: '13px', color: 'gray' }}>{review.date}</div>
              </div>
            </Col>

            <div className="fs-6" style={{ width: '100%', display: 'block', margin: '10px auto', lineHeight: '1.5' }}>
              {review.context}
            </div>

            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              {imageArray.length === 1 && (
                <div style={{ flex: '1' }}>
                  <img
                    src={imageArray[0]}
                    className="rounded mx-auto d-block"
                    alt="..."
                    style={{
                      height: 'auto',
                      maxHeight: '400px',
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
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '7px' }}>
                   <div style={{ marginRight: '5px' }}>
                     <img
                       src={imageArray[0]}
                       className="rounded mx-auto d-block"
                       alt="..."
                       style={{
                         width: '100%',
                         maxWidth: '355px',
                         height: 'auto',
                         objectFit: 'cover'
                       }}
                       onClick={() => handleImageClick(imageArray[0])}
                     />
                   </div>
                   <img
                     src={imageArray[1]}
                     className="rounded mx-auto d-block"
                     alt="..."
                     style={{
                       width: '100%',
                       maxWidth: '355px',
                       height: 'auto',
                       objectFit: 'cover'
                     }}
                     onClick={() => handleImageClick(imageArray[1])}
                   />
                 </div>
               </>
              )}

              {imageArray.length === 3 && (
                <div style={{ width: '100%', display: 'flex', margin: 'auto', alignItems: 'center' }}>
                  <div style={{ flex: '1' }}>
                    <img
                      src={imageArray[0]}
                      className="rounded mx-auto d-block"
                      alt="..."
                      style={{
                        width: '100%',
                        maxHeight: '254px',
                        maxWidth: '470px',
                        height: 'auto',
                        display: 'block',
                        margin: 'auto 5px',
                        objectFit: 'cover'
                      }}
                      onClick={() => handleImageClick(imageArray[0])}
                    />
                  </div>
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        marginTop: '5px',
                        objectFit: 'cover'
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

      <PlaceReviewPhoto show={modalShow} onHide={() => setModalShow(false)} image={selectedImage} />
    </div>
  );
};

export default PlaceReview;
