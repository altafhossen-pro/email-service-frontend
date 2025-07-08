'use client';

import React, { useEffect } from 'react';

const BlockMouceWheel = () => {
    useEffect(() => {
        const preventWheelChange = (e) => {
            if (e.target.type === 'number' && document.activeElement === e.target) {
                e.preventDefault(); // Prevent scroll from affecting input value
            }
        };

        document.addEventListener('wheel', preventWheelChange, { passive: false });

        return () => {
            document.removeEventListener('wheel', preventWheelChange);
        };
    }, []);
    return (
        <>

        </>
    );
};

export default BlockMouceWheel;