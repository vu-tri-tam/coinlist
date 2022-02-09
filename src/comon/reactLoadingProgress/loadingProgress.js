import React, { useState, useRef, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

const LoadingProgress = () => {
    const ref = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        ref.current.complete()
    }, [])

    return (
        <div>
            <LoadingBar color="#f11946" ref={ref} shadow={true} height={5} waitingTime={1000} />
        </div>
    )
}

export default LoadingProgress