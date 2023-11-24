import React, { useEffect } from 'react';
import styles from '../../../css/plannerView.module.css'

const ImgModal = (props) => {
    const {link,onClose,mouse} = props

    useEffect(()=>{
        const img = document.getElementById('img')

        img.style.left = `${mouse.x}px`;
        img.style.top = `${mouse.y}px`;
        
        requestAnimationFrame(() => {
            img.style.left = '50%';
            img.style.top = '40%';
        });
    },[])

    return (
        <div>
            <div className={styles.bgImg} onClick={onClose}></div>
                <img className={styles.onImg} src={link} id='img' onClick={onClose}></img>
        </div>
    );
};

export default ImgModal;