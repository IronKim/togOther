import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function PlaceReviewWrite() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileUpload = (event) => {
    // 1. 이벤트에서 파일을 추출합니다.
    const files = event.target.files;

    // 2. 추출한 파일을 적절하게 처리합니다.
    // 예를 들어, 파일 목록을 콘솔에 출력하는 경우:
    for (let i = 0; i < files.length; i++) {
      console.log(`File ${i + 1}:`, files[i]);
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
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>글 내용</Form.Label>
              <Form.Control as="textarea" rows={3} 
              style={{ height: "300px" ,resize: "none" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>사진 업로드</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload} // 파일 업로드 이벤트 처리기 추가
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary">작성하기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceReviewWrite;