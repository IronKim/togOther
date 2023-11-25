import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingComponent = () => {
    return (
        <div style={{ margin: '0 auto', maxWidth: '1200px'}}>
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingComponent;