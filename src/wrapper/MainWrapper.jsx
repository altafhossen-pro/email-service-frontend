


import ReduxProvider from '@/providers/ReduxProvider';
import React from 'react';
import AuthWrapper from './AuthWrapper';

const MainWrapper = ({ children }) => {

    return (
        <>
            <ReduxProvider>
                <AuthWrapper>
                    {children}
                </AuthWrapper>
            </ReduxProvider>
        </>
    );
};

export default MainWrapper;