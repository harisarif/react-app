import React from 'react';
import PropTypes from 'prop-types';
// import { baseurl } from '../services/axios';

const NoDataFound = ({ 
    message, 
    className,
    image,
    imageClassName,
    width,
    containerClassName = "text-center py-5"
}) => {
    return (
        <div className={containerClassName}>
            <div className={`mb-3 ${imageClassName}`}>
                <img 
                    src={image || `${process.env.REACT_APP_BACKEND_BASE_URL}/images/no-data-img.webp`}
                    alt="No data found"
                    className={`${width} h-auto`}
                />
            </div>
            <p className={`text-muted ${className}`}>{message}</p>
        </div>
    );
};

NoDataFound.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    containerClassName: PropTypes.string
};

export default NoDataFound;
