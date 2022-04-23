import React  from 'react'
import { useHistory } from 'react-router-dom';
import "./Visiblepage.css"
import logo from "../images/logo.png"
import Typewriter from "typewriter-effect";


function Visiblepage() {
    let history=useHistory();
    return (
    <div className='visiblepage'>
        <div className="Typing_text">
        <Typewriter
            
            onInit={(typewriter)=> {
            typewriter
            .typeString("iNotebook")
            // .pauseFor(0)
            .deleteAll()
            .typeString("Welcomes You")
            .start();
            }}
            />
        </div>
        <div className='container1'>
            <img className='logo' src={logo} alt=""/>
            <button className='button' onClick={()=>{history.push('/signup')}}>REGISTER</button>
            <div>OR</div>
            <button className='button' onClick={()=>{history.push('/login')}}>SIGNIN</button>
            <div>For using this website you have to Login or Register....</div>
        </div>
    </div>
  )
}

export default Visiblepage