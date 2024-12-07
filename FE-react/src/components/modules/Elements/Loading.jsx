import React from 'react'

const Loading = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="loading loading-spinner w-32"></span>
        </div>
    )
}

export default Loading