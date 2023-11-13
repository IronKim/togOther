import React from 'react';
import PlaceInfo from '../components/Info/PlaceInfo';
import { useParams } from 'react-router-dom';

const PlacePage = () => {

    const {placeSeq} = useParams();

    return (
        <div>
            <PlaceInfo placeSeq={placeSeq}/>
        </div>
    );
};

export default PlacePage;