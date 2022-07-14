import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"

import PlayWindow from './PlayWindow/PlayWindow';

import './MusicList.css'

export default function MusicList() {
    const [musics, setMusics] = useState([])

    const [title, setTitle] = useState()
    const [artist, setArtist] = useState()
    const [uniqueId, setUniqueId] = useState()
    const [image, setImage] = useState()
    const [audioFile, setAudioFile] = useState()
    const [play, setPlay] = useState(false)
    const [pop, setPop] = useState(null)

    const [isPlaying, setIsPlaying] = useState(false)

    const [isEnter, setIsEnter] = useState(false)

    const [networkLoad, setNetworkLoad] = useState(true)
    const [loadingScreen, setLoadingScreen] = useState()
    const [retry, setRetry] = useState(false)

    const [nowPlaying, setNowPlaying] = useState()


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/playlist/1362516565',
            headers: {
                'X-RapidAPI-Key': '6cf60c5035msh9833080620e7dbap1eb5cajsna95426d6ced6',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        }

        axios.request(options).then(function (response) {
            setNetworkLoad(true)
            const res = response.data
            setMusics(res.tracks.data)
        }).catch(function (error) {
            // console.log(error, 'Error Fetching');
            setTimeout(() => {
                setNetworkLoad(false)
            }, 5000);
        })
    }, [retry])

    useEffect(() => {
        if (networkLoad) {
            setLoadingScreen(<div className="loader">Loading...</div>)
        } else {
            setLoadingScreen(<div className='retryBtn'>
                <p onClick={() => {
                    setNetworkLoad(true)
                    setRetry(!retry)
                }}>No Response From Server. Please Retry</p>
            </div>)
        }
    }, [networkLoad, retry])

    useEffect(() => {
        if (isPlaying) {
            setNowPlaying(<div className="nowPlaying" onClick={() => setPop('translateY(0)')}>
                <div>
                    <small>Now Playing</small>
                    <p>{title}</p>
                </div>
                <span><FontAwesomeIcon icon="fa-solid fa-compact-disc" /></span>
            </div>)
        } else {
            setNowPlaying(<div className='musicHeader'>
                <p tabIndex={0} className="playBtn">Tap on a music to play.</p>
                <small style={{ color: 'red' }}>Dev. on hiatus</small>
            </div>)
        }
    }, [isPlaying, title])


    function playMusic(id, title, artist, image, audioFile, fromControl = true) {
        setTitle(title)
        setArtist(artist)
        setImage(image)
        setPop('translateY(0)')

        if (fromControl) {
            setIsPlaying(true)
            setPlay(false)
            setAudioFile(audioFile)
            setPlay(true)
        }


        if (isPlaying === false) {
            if (id !== uniqueId) {
                setUniqueId(id)
                setAudioFile(audioFile)
                setPlay(true)

            } else {
                mutatePlayState()
                setPop('translateY(0)')
            }
            setIsPlaying(true)
        } else if (isPlaying && id !== uniqueId) {
            setPlay(false)
            setUniqueId(id)
            setAudioFile(audioFile)
            setPlay(true)
        } else if ((fromControl && id === uniqueId) && isPlaying) {
            setPlay(false)
            setAudioFile(audioFile)
            setPlay(true)
        }
        else {
            setPlay(false)
            setIsPlaying(false)
            setPop('translateY(0)')
        }

        setIsEnter(true)
    }

    function exitFullScreen() {
        setIsEnter(false)
    }

    function playinFunc() {
        setIsPlaying(false)
        setPlay(false)
    }

    function closePlayWindow() {
        setPop('translateY(500%)')
    }

    function mutatePlayState() {

        if (play === false) {
            setPlay(true)
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
            setPlay(false)
        }
    }

    function prevSong() {
        let prevNumber = uniqueId

        if (prevNumber > 0) {
            setUniqueId(prevNumber - 1)
        } else if (prevNumber === 0) {
            setUniqueId(parseInt(musics.length - 1))
        } else if (prevNumber === musics.length - 1) {
            setUniqueId(parseInt(0))
        }
        playMusic(prevNumber, musics[prevNumber].title, musics[prevNumber].artist.name, musics[prevNumber].album.cover_medium, musics[prevNumber].preview, true)
    }

    function nextSong() {
        let nextNumber = uniqueId

        if (nextNumber >= 0) {
            setUniqueId(parseInt(nextNumber + 1))
        } else if (nextNumber === musics.length - 1) {
            setUniqueId(parseInt(0))
        } else {
            setUniqueId(parseInt(0))
        }
        playMusic(nextNumber, musics[nextNumber].title, musics[nextNumber].artist.name, musics[nextNumber].album.cover_medium, musics[nextNumber].preview, true)
    }


    return (
        <>
            <PlayWindow artist={artist}
                isEnter={isEnter}
                setIsEnter={setIsEnter}
                exitFullScreen={exitFullScreen}
                nextSong={nextSong}
                prevSong={prevSong}
                mutatePlayState={mutatePlayState}
                playinFunc={playinFunc}
                isPlaying={isPlaying}
                play={play}
                pop={pop}
                closePlayWindow={closePlayWindow}
                title={title}
                image={image}
                audioFile={audioFile} />
            <div className='musicList'>
                {musics.length > 0 ? <>
                    {nowPlaying}
                    {musics.map((music, id) => (
                        <div className='musicHolder' key={id}
                            onClick={() => playMusic(id, music.title, music.artist.name, music.album.cover_medium, music.preview)} >
                            <div className='thumbnail'>
                                <img src={music.album.cover_small} alt="thumbnail" />
                            </div>
                            <div className="musicText">
                                <p>{music.title}</p>
                                <p>{music.artist.name}</p>
                            </div>
                            <div className="musicControls">
                                <span><FontAwesomeIcon icon="fa-solid fa-info" /></span>
                            </div>
                        </div>
                    ))}
                </> : loadingScreen}
            </div>
        </>
    )
}