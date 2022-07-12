
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import Fullscreen from 'fullscreen-react';

import './PlayWindow.css'

export default function PlayWindow(props) {

    const audioRef = useRef()
    const seekRef = useRef()
    const [seekTime, setSeekTime] = useState(0)

    const [timeUpdate, setTimeUpdate] = useState()
    const [duration, setDuration] = useState()

    useEffect(() => {
        if (props.audioFile) {
            if (props.play) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [props.audioFile, props.play])

    useEffect(() => {
        let timeUpdate

        if (props.audioFile) {
            seekRef.current.value = seekTime
            audioRef.current.onended = function () {
                props.playinFunc()
                clearInterval(timeUpdate)
                props.nextSong()
            }
        }

        if (props.audioFile && props.play) {
            timeUpdate = setInterval(() => {
                setSeekTime(audioRef.current.currentTime / audioRef.current.duration * 100)

                setTimeUpdate(Math.floor(audioRef.current.currentTime))
                setDuration(Math.floor(audioRef.current.duration))
            }, 1000)
        }
    }, [props, seekTime])


    let popUp = { transform: props.pop ? props.pop : 'translateY(500%)' }


    return (
        <Fullscreen isEnter={props.isEnter} onChange={props.setIsEnter}>
            <div className='playWindow' style={popUp}>
                <div className='playHeader'>
                    <span className='btnDown' tabIndex={0} onClick={() => {
                        props.closePlayWindow()
                        props.exitFullScreen()
                    }}>
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
                <div className='audioManager'>
                    <div className='audioControls'>
                        <span onClick={() => props.prevSong()}>
                            <FontAwesomeIcon icon="fa-solid fa-backward-step" />
                        </span>
                        <span onClick={() => props.mutatePlayState()}>
                            {!props.isPlaying ?
                                <FontAwesomeIcon icon="fa-solid fa-play" /> : <FontAwesomeIcon icon="fa-solid fa-pause" />}
                        </span>
                        <span onClick={() => props.nextSong()}>
                            <FontAwesomeIcon icon="fa-solid fa-forward-step" />
                        </span>
                    </div>
                    <div className='audioSeek'>
                        <small>0:{timeUpdate}</small>
                        <input className='timeUpdate' ref={seekRef} type={'range'} />
                        <small>0:{duration}</small>
                    </div>
                </div>
            </div>
        </Fullscreen>
    )
}