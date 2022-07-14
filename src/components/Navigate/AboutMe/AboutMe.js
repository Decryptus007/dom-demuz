import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './AboutMe.css'
import me from '../../../images/me.jpg'

export default function AboutMe(props) {

    let slide = { transform: props.slide ? props.slide : 'translateX(500%)' }

    return (
        <div className='aboutMe' style={slide}>
            <div className='profileHeader'>
                <span className='backP' onClick={() => props.slideBack()}><FontAwesomeIcon icon="fa-solid fa-angle-left" /></span>
                <div>
                    <img src={me} alt='myImg' />
                </div>
                <p>
                    <span><FontAwesomeIcon icon="fa-solid fa-user" /></span>
                    Orefuwa Dominic <small>(Decryptus)</small>
                </p>
            </div>
            <main>
                <div className='meBio'>
                    <span><FontAwesomeIcon icon="fa-solid fa-bullhorn" /></span>
                    <small>I am a Software Engineer who loves bringing ideas into reality and always looking for opportunities to increase my performance.</small>
                </div>
                <article>
                    <a href='https://www.linkedin.com/in/decryptus' target={'_blank'} rel="noreferrer">
                        <p>
                            <span><FontAwesomeIcon icon="fa-brands fa-linkedin" /></span>
                            LinkedIn
                        </p>
                    </a>
                    <a href='https://github.com/Decryptus007/' target={'_blank'} rel="noreferrer">
                        <p>
                            <span><FontAwesomeIcon icon="fa-brands fa-github" /></span>
                            GitHub
                        </p>
                    </a>
                    <a href='https://twitter.com/inidomnick' target={'_blank'} rel="noreferrer">
                        <p>
                            <span><FontAwesomeIcon icon="fa-brands fa-twitter" /></span>
                            Twitter
                        </p>
                    </a>
                </article>
            </main>
        </div>
    )
}
