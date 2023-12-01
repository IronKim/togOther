import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useUserStore } from '../../stores/mainStore';
import { getPlaceReviewListByReviewSeq, updateReview } from '../../api/PlaceReviewApiService';
import { uploadPlannerImage } from '../../api/PlannerApiService';

function PlaceReviewUpdate({ reviewSeq, placeSeq, loadInitialReviews }) {
  const [show, setShow] = useState(false);
  const { user } = useUserStore();
  const [reviewContext, setReviewContext] = useState('');
  const [selectedImages, setSelectedImages] = useState('');

  const handleImageCancel = (index) => {
    const images = selectedImages.split(',');
    images.splice(index, 1); // 선택 취소된 이미지를 배열에서 제거
    setSelectedImages(images.join(',')); // 업데이트된 이미지를 state에 설정
  };

  const fileInputRef = useRef(null);

  const handleImageUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    // 리뷰 데이터를 불러와 초기화
    const fetchReviewData = async () => {
      try {

        const response = await getPlaceReviewListByReviewSeq(parseInt(reviewSeq));
        const existingReview = response.data;
        setReviewContext(existingReview.context);
        setSelectedImages(existingReview.image || ''); // 이미지가 없을 경우 빈 문자열로 초기화
      } catch (error) {
        console.error('리뷰 데이터 불러오기 오류:', error);
      }
    };

    if (show) {
      fetchReviewData();
    }
  }, [reviewSeq, show]);

  const handleClose = () => {
    setShow(false);
    setReviewContext('');
    setSelectedImages('');
  };

  const handleShow = () => {
    if (user.userSeq === "") {
      alert('로그인 후 이용해주세요!');
    } else {
      setShow(true);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    let image = '';

    if (files.length > 3) {
      alert('3개 이하로 선택해주세요.');
    } else if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        image += URL.createObjectURL(files[i]);
        if (i !== files.length - 1) image += ',';
      }
      setSelectedImages(image);
    } else {
      setSelectedImages('')
    }
  };

  const handleUpdateReview = async () => {
    if (reviewContext.trim() === "") {
      alert('리뷰 내용을 입력해주세요!');
      return;
    }
  
    try {
      const formData = new FormData();
      const images = selectedImages.split(',');
      let res2 = {}; // res2를 빈 객체로 초기화
  
      if (images.filter(item => !item.includes('bitcamp-edu-bucket-97')).length > 0) {
        await Promise.all(images.map(async (item2, index2) => {
          const response = await fetch(item2);
          const blob = await response.blob();
          const file = new File([blob], `image_${index2}.png`, { type: 'image/png' });
          formData.append('files', file);
        }));
  
        res2 = await uploadPlannerImage(formData);
      } else {
        res2.data = ''; // 이미지가 없는 경우 빈 문자열로 설정
      }
  
      const placeReviewDTO = {
        placeSeq: placeSeq,
        user: user,
        context: reviewContext,
        image: selectedImages !== '' && res2.data + images.filter(item => item.includes('bitcamp-edu-bucket-97')).join(','),
      };
  
      // 여기서 updateReview 호출
      // updateReview 호출 이후에 loadInitialReviews와 handleClose를 실행하도록 수정
      await updateReview(reviewSeq, placeReviewDTO);
      handleClose();
      window.location.reload();
      //loadInitialReviews();
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error);
    }
  };

  return (
    <>
      <span style={{ color: 'red', cursor: 'pointer', textAlign: 'right' }} variant="primary" onClick={handleShow}>
        수정
      </span>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>리뷰 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>글 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ height: "300px", resize: "none" }}
                name='context'
                value={reviewContext}
                onChange={(e) => setReviewContext(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleImageUploadButtonClick}
                >
                  사진 업로드
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  name='image'
                />
              </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>선택된 사진</Form.Label>
            {selectedImages && selectedImages.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedImages.split(',').map((imageUrl, index) => (
                  <div key={index} style={{ marginBottom: '10px', marginRight: '10px', display: 'flex', flexDirection: 'column' }}>
                    <img src={imageUrl} alt={`image_${index}`} style={{ width: '100px', height:'100px'}} />
                    <Button variant="danger" size="sm" onClick={() => handleImageCancel(index)}>
                      선택 취소
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleUpdateReview}>
            수정하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceReviewUpdate;
