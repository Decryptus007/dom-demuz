
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './PlayWindow.css'

export default function PlayWindow(props) {

    return (
        <div className='playWindow'>
            <div className='playHeader'>
                <span><FontAwesomeIcon icon="fa-solid fa-angle-down" /></span>
                <div>
                    <p>{props.title}</p>
                    <p>{props.artist}</p>
                </div>
                <div>
                    <img src={props.image} alt='imageArtist' />
                </div>
                <audio src={props.audioFile} controls />
            </div>
        </div>
    )
}