import React from 'react';
import Form from '../components/community/planner/Form';
import { useParams } from 'react-router-dom';

const Planner = ({up}) => {
    const { plannerSeq } = useParams();

    return (
        <div>
            <Form plannerSeq={plannerSeq} up={up}/>
        </div>
    );
};

export default Planner;