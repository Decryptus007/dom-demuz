
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import lottieWeb from 'https://cdn.skypack.dev/lottie-web'
import { useEffect, useRef, useState } from 'react'

import './PlayWindow.css'

export default function PlayWindow(props) {

    const [btnState, setBtnState] = useState('play')

    const audioRef = useRef()

    useEffect(() => {
        if (props.audioFile) {
            if (props.playState) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [props.audioFile, props.playState])

    let popUp = { transform: props.pop ? props.pop : 'translateY(500%)' }



    return (
        <div className='playWindow' style={popUp}>
            <div className='playHeader'>
                <span className='btnDown' tabIndex={0} onClick={() => props.closePlayWindow()}>
                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                </span>
                <div className='titleTxt'>
                    <p>{props.title}</p>
                    <small>{props.artist}</small>
                </div>
            </div>
            <div>
                <img src={props.image} alt='imageArtist' />
            </div>
            <audio ref={audioRef} src={props.audioFile} controls />
        </div>
    )
}