import React from 'react';
import styles from '../../../css/plannerView.module.css'
import PlaceInfo from '../../Info/PlaceInfo';
import PlaceReview from '../../Info/PlaceReview';

const containerStyle = {
    width: '95%',
    height: '250px',
    borderRadius : '20px',
    margin: 'auto'
};


const Modal = (props) => {
    const{onClose,modal,custom,GoogleMap,Marker} = props

    return (
        <div>
            <div className={styles.bg} onClick={onClose}></div>
                <div className={styles.onModal}>
                    {
                        modal.sw === 0 && <div className={styles.inPlace}>    
                        <PlaceInfo  placeSeq={modal.seq}/>
                        <PlaceReview placeSeq={modal.seq}/>
                        </div>
                    }
                    {
                        modal.sw === 1 && custom.find(cus => cus.plCustomSeq === modal.seq) && <div><GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: parseFloat(custom.find(item => item.plCustomSeq === modal.seq).latitude),
                            lng: parseFloat(custom.find(item => item.plCustomSeq === modal.seq).longitude)
                        }}
                        zoom={15}
                        options={{ disableDefaultUI: true}}
                        >
                        <Marker
                        position={{
                            lat: parseFloat(custom.find(item => item.plCustomSeq === modal.seq).latitude),
                            lng: parseFloat(custom.find(item => item.plCustomSeq === modal.seq).longitude)
                        }}
                    />
                    </GoogleMap>
                        <div>
                            <p className={styles.cusTitle}>{custom.find(item => item.plCustomSeq === modal.seq).placeName}</p>
                            <p className={styles.cusAddress}>{custom.find(item => item.plCustomSeq === modal.seq).address}</p>
                        </div>
                    </div>
                    }
                </div>
        </div>
    );
};

export default Modal;