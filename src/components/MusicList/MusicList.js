import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"

import PlayWindow from './PlayWindow/PlayWindow';

import './MusicList.css'

export default function MusicList() {
    const [musics, setMusics] = useState([])
    const [musicDuration, setMusicDuration] = useState([])
    const [hours, setHours] = useState([])
    const [mins, setMins] = useState([])

    const [title, setTitle] = useState()
    const [artist, setArtist] = useState()
    const [uniqueId, setUniqueId] = useState()
    const [image, setImage] = useState()
    const [audioFile, setAudioFile] = useState()
    const [play, setPlay] = useState(false)
    const [pop, setPop] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/playlist/1362516565',
        headers: {
            'X-RapidAPI-Key': '6cf60c5035msh9833080620e7dbap1eb5cajsna95426d6ced6',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    }

    useEffect(() => {
        axios.request(options).then(function (response) {
            const res = response.data
            setMusics(res.tracks.data)
            setMusicDuration(res.duration)
        }).catch(function (error) {
            console.log(error, 'Error Fetching');
        })
    })

    useEffect(() => {
        if (musicDuration) {
            setHours(Math.floor(musicDuration / 3600));
            setMins(musicDuration % 60)
        }
    }, [musicDuration])


    function playMusic(id, title, artist, image, audioFile) {
        setTitle(title)
        setArtist(artist)
        setImage(image)
        setPop('translateY(0)')

        if (id !== uniqueId) {
            // if (newAudio && (audio !== newAudio)) {
            //     console.log('If Block');
            //     audio.pause()
            //     audio.currentTime = 0
            //     audio.src = ''
            //     console.log(audio.src);
            // } else {
            //     audio === newAudio ? console.log(true) : console.log(false);
            //     setPop('translateY(0)')
            //     setUniqueId(id)
            //     setAudioFile(audioFile)
            //     newAudio.play()
            //     console.log('Else Block');
            // }
            setUniqueId(id)
            setAudioFile(audioFile)
            setPlay(true)

        } else {
            setPop('translateY(0)')
        }
    }

    function closePlayWindow() {
        setPop('translateY(500%)')
    }


    return (
        <>
            <PlayWindow artist={artist}
                playState={play}
                pop={pop}
                closePlayWindow={closePlayWindow}
                title={title}
                image={image}
                audioFile={audioFile} />
            <div className='musicList'>
                {musics.length > 0 ? <>
                    <div className='musicHeader'>
                        <p tabIndex={0} className="playBtn">Play All</p>
                        <small>{hours}hrs {mins}mins</small>
                    </div>
                    {musics.map((music, id) => (
                        <div className='musicHolder' key={id}>
                            <div className="musicText">
                                <p>{music.title}</p>
                                <p>{music.artist.name}</p>
                            </div>
                            <div className="musicControls">
                                <span onClick={() => playMusic(id, music.title, music.artist.name, music.album.cover_medium, music.preview)}
                                ><FontAwesomeIcon icon="fa-solid fa-play" /></span>
                                <span><FontAwesomeIcon icon="fa-solid fa-info" /></span>
                            </div>
                        </div>
                    ))}
                </> : <div className="loader">Loading...</div>}
            </div>
        </>
    )
}