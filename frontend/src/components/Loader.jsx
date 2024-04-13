import React from 'react'
import "../styles/loader.css"
export default function Loader() {
    return (
        <div className=' flex w-full h-full justify-center items-center '>
            <div className="loader-container">
                <div className="loader-slice"></div>
                <div className="loader-slice"></div>
                <div className="loader-slice"></div>
                <div className="loader-slice"></div>
                <div className="loader-slice"></div>
                <div className="loader-slice"></div>
            </div>
        </div>
    )
}

