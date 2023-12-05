import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useUserStore } from '../../stores/mainStore';
import { addPlaceReview } from '../../api/PlaceReviewApiService';
import { uploadPlannerImage } from '../../api/PlannerApiService';
import sweet from 'sweetalert2';    


function PlaceReviewWrite({ placeSeq }) {
  const [show, setShow] = useState(false);
  const { user } = useUserStore();
  const [reviewContext, setReviewContext] = useState('');
  const [selectedImages, setSelectedImages] = useState('');
  const handleClose = () => {
    setShow(false);
    // 모달이 닫힐 때 폼 필드를 초기화합니다.
    setReviewContext('');
    setSelectedImages('');
  };
  const handleShow = () => {
    if (user.userSeq === "") {
      sweet.fire({
        title: "로그인 후 이용해 주세요.",
        icon: "warning"
    })
    } else {
      setShow(true);
    }
  };
  const handleFileUpload = (e) => {
    // 파일 업로드를 처리합니다.
    const files = e.target.files;
    let image = ''
    if(files.length > 3) 
    sweet.fire({
      title: "3개 이하로 선택해 주세요.",
      icon: "warning"
  })
    else {
      for (let i = 0; i < files.length; i++) {
          image += URL.createObjectURL(files[i]);
          if(i !== files.length-1) image += ',';
      }
    }
    setSelectedImages(image);
  };
  const handleWriteReview = async () => {
    // 리뷰 내용이 비어있는지 확인합니다.
    if (reviewContext.trim() === "") {
      sweet.fire({
        title: "리뷰 내용을 입력해 주세요.",
        icon: "warning"
    })
      return;
    }
    try {
        const formData = new FormData();
        const images = selectedImages.split(',')
        Promise.all(images.map((item2, index2) => {
            return fetch(item2)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], `image_${index2}.png`, { type: 'image/png' });
                formData.append(`files`, file);
            });
        }))
        .then(() => {
            uploadPlannerImage(formData)
            .then(res2 => {
              const reviewData = {
                placeSeq: placeSeq,
                user: user,
                context: reviewContext,
                image: res2.data
              };

              console.log(reviewData);
              addPlaceReview(reviewData)
            })
            .catch(e => console.log(e))
        })
    /*
      // FormData 객체를 생성하고 리뷰 데이터를 추가합니다.
      const formData = new FormData();
      for (const key in reviewData) {
        formData.append(key, reviewData[key]);
      }
      // 선택된 이미지 파일을 추가합니다.
      selectedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      // API를 호출하여 리뷰와 이미지를 추가합니다.
      await formData);
    */
      // 리뷰 작성 성공 후 모달을 닫습니다.
      handleClose();
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error);
      // 오류 처리 (예: 사용자에게 알림을 표시)
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        리뷰 작성
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>리뷰 작성</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>사진 업로드</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                name='image'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleWriteReview}>
            작성하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PlaceReviewWrite;