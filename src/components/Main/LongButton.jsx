import React from 'react';
import '../../styles/LongButton.css';

const LongButton = ({ to,onClick, children, className }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default LongButton;
