import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoaderComponent.scss';

const Loader: FC = () => {
    return (
        <div className="spinner-wrapper">
            <Spinner animation="border" role="status" variant="dark" className="spinner">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
