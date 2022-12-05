import React from 'react';

import Spinner from './Spin-1s-200px.gif';

export default () => {
    return (

        <div className='background-loading'>
            <div className='loading-text'>잠시만 기다려 주세요</div>
            <img src={Spinner} alt="로딩중" width="5%" />
        </div>
    );
};
