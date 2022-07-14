import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import AboutMe from './AboutMe/AboutMe'

import './Navigate.css'

export default function Navigate() {

    const [slide, setSlide] = useState(null)

    function slideBack() {
        setSlide('translateX(500%)')
    }

    return (
        <>
            <AboutMe slide={slide} slideBack={slideBack} />
            <div className='navigate'>
                <span tabIndex={0}><FontAwesomeIcon icon="fa-solid fa-record-vinyl" /></span>
                <span tabIndex={0} onClick={() => setSlide('translateX(0)')}>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
            </div>
        </>
    )
}