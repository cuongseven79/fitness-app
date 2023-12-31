import React from 'react'


const IconClose = ({
    title,
    size,
    className,
    color
}) => {

    return (
        <div>
            <svg className={`${className} "w-3 h-3"`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={color} viewBox={`0 0 ${size} ${size}`}>
                <title>{title}</title>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </div>
    )
}

export default IconClose
