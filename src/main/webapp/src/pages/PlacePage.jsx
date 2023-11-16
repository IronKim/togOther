import React from 'react';
import PlaceInfo from '../components/Info/PlaceInfo';
import { useParams } from 'react-router-dom';
import PlaceReview from '../components/Info/PlaceReview';

const PlacePage = () => {

    const {placeSeq} = useParams();

    return (
        <div>
            <PlaceInfo placeSeq={placeSeq}/>
            <PlaceReview placeSeq={placeSeq}/>
        </div>
    );
};

export default PlacePage;