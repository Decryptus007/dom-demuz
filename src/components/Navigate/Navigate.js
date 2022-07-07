import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Navigate.css'

export default function Navigate () {

    return (
        <div className='navigate'>
            <span tabIndex={0}><FontAwesomeIcon icon="fa-solid fa-compact-disc" /></span>
            <span tabIndex={0}><FontAwesomeIcon icon="fa-solid fa-user" /></span>
        </div>
    )
}