import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import PlaceReviewWrite from './PlaceReviewWrite';
import PlaceReviewPhoto from './PlaceReviewPhoto';
import { getPlaceReviewBySeq } from '../../api/PlaceApiServeice';
import { useEffect } from 'react';

const PlaceReview = (placeSeq) => {
    const [selectedPlaceReview, setSelectedPlaceReview] = useState([]);
    const selectedPlaceSeq = placeSeq; // 원하는 placeSeq 값으로 설정
    const [modalShow, setModalShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    useEffect(() => {

        getPlaceReviewBySeq(selectedPlaceSeq)
          .then(response => {
            setSelectedPlaceReview(response.data);
          })
          .catch(error => {
            console.error('Error fetching place details: ', error);
          });
      }, [selectedPlaceSeq]);


    //  const imageCount =selectedPlaceReview.image.length;
   // const imageCount =0;


    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModalShow(true);
      };

    return (
        <div>
            <div style={{width:"728px", display: "block", margin: "auto"}}>
                <div style={{ display: "flex", justifyContent: "space-between"  }}>
                    <p class="fs-3">리뷰 {selectedPlaceReview.length}</p>
                    <p style={{ margin: "0", alignSelf: "flex-end" }}>
                    {/* 리뷰 내용 */}
                    <PlaceReviewWrite />
                    </p>
                </div>
            </div>
            {selectedPlaceReview.map((review) => (
            
            <div key={review.reviewSeq} style={{width:"728px", display: "block", margin: "auto"}}><Col xs={6} md={4} style={{ display: 'flex', alignItems: 'center' }}>
               
                <Image src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MThfMTU2%2FMDAxNjk1MDM2NzI3MzE3.Z-Oq4mYlrCaT0r5TB2oQalAWRLiLVJhBthI-M2nwyL0g.xSi69LOEMKWOBo4DWwciZn0kiZvA7LW0ERmIRjog11Mg.JPEG.depingo_%2Falpaca-2907771_1920-e1638893381620.jpg&type=sc960_832" roundedCircle 
                style={{ width: '40px', height: '40px' }} // 원하는 크기로 조절
                />
                <div>
                    <div class="fw-bolder" style={{margin: "10px auto auto 10px"}}>작성자</div>
                    <div style={{margin: "10px auto auto 10px", fontSize: "13px", color: "gray"}}>{review.date}</div>
                </div></Col>
                <div class="fs-6" style={{width:'708px' , display: 'block', margin: '10px auto' , lineHeight: '1.5'}}>
                     {review.context}
                </div>
                <div style={{ width: "728px", display: "flex", alignItems: "center" }}>
                    {review.image.length === null && (
                    <div style={{  }}>
                       
                    </div>
                    )}
                    {review.image.length === 1 && (
                    <div style={{ flex: "1" }}>
                        <img
                        src={review.image[0]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{ width: "720px", height: "325px", display: "block", margin: "auto 5px" }}
                        onClick={() => handleImageClick(review.image[0])}
                        />
                    </div>
                    )}
                    {review.image.length === 2 && (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "7px"}}>
                            <div  style={{marginRight: "5px"}}>
                        <img
                            src={review.image[0]}
                            className="rounded mx-auto d-block"
                            alt="..."
                            style={{ width: "355px", height: "325px" }}
                            onClick={() => handleImageClick(review.image[0])}
                            />
                            </div>
                        <img
                            src={review.image[1]}
                            className="rounded mx-auto d-block"
                            alt="..."
                            style={{ width: "355px", height: "325px" }}
                            onClick={() => handleImageClick(review.image[1])}
                        />
                        </div>
                    </>
                    )}
                 {review.image.length === 3 && (   
                <div style={{ width: "728px", display: "flex", margin: "auto", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                        <img
                        src={review.image[0]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{ width: "470px", height: "291px", display: "block", margin: "auto 5px" }}
                        onClick={() => handleImageClick(review.image[0])}
                        />
                    </div>
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img
                        src={review.image[1]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{ width: "232px", height: "143px" }}
                        onClick={() => handleImageClick(review.image[1])}
                        />
                        <img
                        src={review.image[2]}
                        className="rounded mx-auto d-block"
                        alt="..."
                        style={{ width: "232px", height: "143px", margin: "5px 0 0 0" }}
                        onClick={() => handleImageClick(review.image[2])}
                        />
                    </div>
                </div>
                )}
               </div>
                <hr style={{width:"680x", display: "block", margin: "30px auto"}}/>
            </div>
               ))}
            <PlaceReviewPhoto show={modalShow} onHide={() => setModalShow(false)} image={selectedImage} />
        </div>
    );
};

export default PlaceReview;