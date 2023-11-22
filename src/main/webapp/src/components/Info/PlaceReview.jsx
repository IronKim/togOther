import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlaceReviewWrite from './PlaceReviewWrite';
import PlaceReviewPhoto from './PlaceReviewPhoto';
import { getPlaceReviewBySeq } from '../../api/PlaceApiService';

const PlaceReview = ({ placeSeq }) => {
  const [selectedPlaceReview, setSelectedPlaceReview] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가로 불러올 데이터가 있는지 여부

  const loadInitialReviews = () => {
    getPlaceReviewBySeq(placeSeq, 1)
      .then(response => {
        const sortedReviews = response.data.sort((a, b) => a.reviewSeq - b.reviewSeq);
        const initialReviews = sortedReviews.slice(0, 3);
        setSelectedPlaceReview(initialReviews);
        setPage(2); // 다음 페이지로 업데이트
        // 초기에 불러온 데이터가 3개 미만이면 모든 데이터를 불러왔다고 판단
        if (initialReviews.length < 3) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('장소 세부 정보 가져오기 오류: ', error);
      });
  };

  useEffect(() => {
    // 초기에 3개의 리뷰를 불러옵니다.
    loadInitialReviews();
  }, [placeSeq]); // placeSeq가 변경될 때마다 리뷰를 다시 불러옵니다.

  const loadReviews = (currentPage) => {
    if (!hasMore) return; // 이미 모든 데이터를 불러왔으면 더 이상 로드하지 않음

    const reviewsPerPage = 3; // 페이지당 불러올 리뷰 개수

    getPlaceReviewBySeq(placeSeq, currentPage)
      .then(response => {
        const sortedReviews = response.data.sort((a, b) => a.reviewSeq - b.reviewSeq);

        // 초기에 3개의 리뷰만 불러오도록 수정
        const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        const newReviews = sortedReviews.slice(startIndex, endIndex);

        setSelectedPlaceReview(prevReviews => [...prevReviews, ...newReviews]);
        setPage(currentPage + 1); // 다음 페이지로 업데이트

        // 새로 불러온 데이터가 지정한 개수 미만이면 모든 데이터를 불러왔다고 판단
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
    // 스크롤이 페이지의 하단에 도달하면 다음 페이지의 리뷰를 불러옵니다.
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadReviews(page);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, hasMore]);

  return (
    <div style={{ maxWidth: '728px',  minWidth: '60%', margin: '0 auto', width: '100%'}}>
    <div style={{ maxWidth: '728px', width: '100%', display: 'flex', justifyContent: 'space-between', margin: '10px auto' }}>
      <p className="fs-3">리뷰 {selectedPlaceReview.length}</p>
      <p style={{ margin: '0', alignSelf: 'flex-end' }}>
        <PlaceReviewWrite />
      </p>
    </div>

      {selectedPlaceReview.map((review) => (
        <div key={review.reviewSeq} style={{ maxWidth: '728px', width: '100%', display: 'block', margin: 'auto' }}>
          <Col xs={6} md={4} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MThfMTU2%2FMDAxNjk1MDM2NzI3MzE3.Z-Oq4mYlrCaT0r5TB2oQalAWRLiLVJhBthI-M2nwyL0g.xSi69LOEMKWOBo4DWwciZn0kiZvA7LW0ERmIRjog11Mg.JPEG.depingo_%2Falpaca-2907771_1920-e1638893381620.jpg&type=sc960_832"
              roundedCircle
              style={{ width: '40px', height: '40px' }} // 원하는 크기로 조절
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
          {review.image.length === 1 && (
  <div style={{ flex: "1" }}>
    <img
      src={review.image[0]}
      className="rounded mx-auto d-block"
      alt="..."
      style={{
        width: "100%",
        maxWidth: "720px", // 이미지의 최대 너비 설정
        height: "auto",
        display: "block",
        margin: "auto 5px",
        transition: "width 0.5s",
      }}
      onClick={() => handleImageClick(review.image[0])}
    />
  </div>
)}

{review.image.length === 2 && (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "7px" }}>
      <div style={{ marginRight: "5px" }}>
        <img
          src={review.image[0]}
          className="rounded mx-auto d-block"
          alt="..."
          style={{
            width: "100%",
            maxWidth: "355px", // 이미지의 최대 너비 설정
            height: "auto",
          }}
          onClick={() => handleImageClick(review.image[0])}
        />
      </div>
      <img
        src={review.image[1]}
        className="rounded mx-auto d-block"
        alt="..."
        style={{
          width: "100%",
          maxWidth: "355px", // 이미지의 최대 너비 설정
          height: "auto",
        }}
        onClick={() => handleImageClick(review.image[1])}
      />
    </div>
  </>
)}

{review.image.length === 3 && (
  <div style={{ width: "100%", display: "flex", margin: "auto", alignItems: "center" }}>
    <div style={{ flex: "1" }}>
      <img
        src={review.image[0]}
        className="rounded mx-auto d-block"
        alt="..."
        style={{
          width: "100%",
          maxWidth: "470px", // 이미지의 최대 너비 설정
          height: "auto",
          display: "block",
          margin: "auto 5px",
        }}
        onClick={() => handleImageClick(review.image[0])}
      />
    </div>
    <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img
        src={review.image[1]}
        className="rounded mx-auto d-block"
        alt="..."
        style={{
          width: "100%",
          maxWidth: "232px", // 이미지의 최대 너비 설정
          height: "143px",
        }}
        onClick={() => handleImageClick(review.image[1])}
      />
      <img
        src={review.image[2]}
        className="rounded mx-auto d-block"
        alt="..."
        style={{
          width: "100%",
          maxWidth: "232px", // 이미지의 최대 너비 설정
          height: "143px",
          margin: "5px 0 0 0",
        }}
        onClick={() => handleImageClick(review.image[2])}
      />
    </div>
  </div>
)}

          </div>

          <hr style={{ width: '100%', maxWidth:'700px', display: 'block', margin: '30px auto', borderWidth: '2px' }} />
        </div>
      ))}

      <PlaceReviewPhoto show={modalShow} onHide={() => setModalShow(false)} image={selectedImage} />
    </div>
  );
};

export default PlaceReview;
