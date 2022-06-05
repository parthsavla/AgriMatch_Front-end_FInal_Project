import loginPic1 from './img/loginPic1.jpg'
import accountLogo from './img/accountLogo.png'
import './login.css'
import {auth} from "../firebase";
import { useAuth } from '../contexts/AuthContext';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,useNavigate
} from 'react-router-dom';
import React,{useRef,useState} from 'react';
import AppBarMenu from './AppBarMenu'

export default function ForgotPassword(){
    const emailRef = useRef()
    const navigate = useNavigate()
    const {resetPassword} =useAuth()
    const [error,serError] = useState('')
    const [loading,setLoading] = useState(false)

    async  function handleSubmit(e){
        e.preventDefault()

        try {
            serError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            alert('email sent')
        } catch(error){
            alert(error)
            serError(error)
        }
        setLoading(false)
        
    }
    return(
        <>
        <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
        <div className="LoginContainer">
           <div className='loginImgContainer'>
               <img src={loginPic1} width='100%' height='100%'></img>
           </div>
           <div className='loginFormContainer'>
               <div>
                    <img src={accountLogo} width='70em'></img>
                    <form onSubmit={handleSubmit}>
                        <input className='inputFields' type='text' placeholder='E-mail'ref={emailRef}></input><br/><br/>
                        <input className='inputSubmitButton' type='submit' value='Reset Password' disabled={loading}></input>
                    </form><br></br>
                    <span><Link to='/login'>Login</Link></span><br/>
                    <span> </span>

               </div>
           </div>
        </div>
        
        </>
    )
}