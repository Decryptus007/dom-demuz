
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MusicList from '../MusicList/MusicList'
import Navigate from '../Navigate/Navigate'

import './AppUI.css'

function AppUI() {

    return (
        <div className='appUI'>
            <div className='imageHolder'>
                <h2><span style={{ color: 'tomato' }}>De</span><span style={{ color: 'skyblue' }}>muz</span>
                    <span style={{ color: 'black' }}><FontAwesomeIcon icon="fa-solid fa-music" /></span>
                </h2>
                <p>Top Nigeria🇳🇬 Preview</p>
            </div>
            <div className='deezerPowered'>
                <small>Powered by <b>deezer API </b>
                    <span><FontAwesomeIcon icon="fa-brands fa-deezer" /></span>
                </small>
            </div>
            <MusicList />
            <Navigate />
        </div>
    )
}

export default AppUI