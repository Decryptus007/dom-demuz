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
    const [image, setImage] = useState()
    const [audioFile, setAudioFile] = useState()
    const [playWindow, setPlayWindow] = useState(false)

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
            console.log(res.tracks.data);
            setMusics(res.tracks.data)
            setMusicDuration(res.duration)
        }).catch(function (error) {
            console.error(error);
        })
    })

    useEffect(() => {
        if (musicDuration) {
            setHours(Math.floor(musicDuration / 3600));
            setMins(musicDuration % 60)
        }
    }, [musicDuration])


    function playMusic(title, artist, image, audioFile) {
        setTitle(title)
        setArtist(artist)
        setImage(image)
        setAudioFile(audioFile)
        setPlayWindow(true)
    }


    return (
        <div className='musicList'>
            {musics.length > 0 ? <>
                <div className='musicHeader'>
                    <p tabIndex={0} className="playBtn">Play All</p>
                    <small>{hours}hrs {mins}mins</small>
                </div>
                {playWindow && <PlayWindow artist={artist}
                    title={title}
                    image={image}
                    audioFile={audioFile} />}
                {musics.map((music, id) => (
                    <div className='musicHolder' key={id}>
                        <div className="musicText">
                            <p>{music.title}</p>
                            <p>{music.artist.name}</p>
                        </div>
                        <div className="musicControls">
                            <span onClick={() => playMusic(music.title, music.artist.name, music.album.cover_medium, music.preview)}
                            ><FontAwesomeIcon icon="fa-solid fa-play" /></span>
                            <span><FontAwesomeIcon icon="fa-solid fa-info" /></span>
                        </div>
                    </div>
                ))}
            </> : <div className="loader">Loading...</div>}
        </div>
    )
}