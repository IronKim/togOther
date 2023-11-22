import React from 'react';
import PlaceInfo from '../components/Info/PlaceInfo';
import { useParams } from 'react-router-dom';
import PlaceReview from '../components/Info/PlaceReview';

const PlacePage = () => {

    const {placeSeq} = useParams();

    return (
        <div>
            <div style={{margin: '0 10px'}}>
            <PlaceInfo  placeSeq={placeSeq}/>
            <PlaceReview placeSeq={placeSeq}/>

            </div>
        </div>
    );
};

export default PlacePage;