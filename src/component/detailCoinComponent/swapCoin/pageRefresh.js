import React, { useState, useEffect } from 'react'
import { IoReload } from 'react-icons/io5';
export default function PageRefresh({ e, countPrice, choosePrice }) {
    const [refresh, setRefresh] = useState()
    const handleRefresh = () => {
        // by calling this method react re-renders the component

        setRefresh(countPrice / choosePrice?.price);
    };
    return (
        <h6>{countPrice || 0}<span className='mx-2'>{choosePrice.name.toUpperCase()}<IoReload className='mx-2' onClick={() => handleRefresh()} /></span></h6>
    )
}
