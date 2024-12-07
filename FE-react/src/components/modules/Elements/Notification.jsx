import React from 'react'

const Notification = ({ message }) => {
    return (
        <div className="toast toast-center absoulute mt-24">
            <div className="alert bg-back/75 text-white">
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Notification