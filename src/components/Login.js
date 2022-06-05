import loginPic1 from './img/loginPic1.jpg'
import accountLogo from './img/accountLogo.png'
import './login.css'
import { useAuth } from '../contexts/AuthContext';
import {Link,useNavigate} from 'react-router-dom';
import React,{useRef,useState} from 'react';
import AppBarMenu from './AppBarMenu'
import { TextField,Button } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {login,readUserData} =useAuth()
    const [error,serError] = useState('')
    const [loading,setLoading] = useState(false)
    const theme = createTheme({
      palette: {
        primary: {
          main:'rgb(243, 243, 243)'
        },
      },
    });


    async  function handleSubmit(e){
        e.preventDefault()
        let a = []
        try {
            serError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            let x = await readUserData(emailRef.current.value)
            if(x == "client"){
                console.log("logged in as client")
                navigate('/dashboard')
            }else if(x == "admin"){
                console.log("logged in as Admin")
                navigate('/adminDash')
                
            }
            
        } catch(error){
            alert(error)
        }
        setLoading(false)
        
    }
    return(
        <>
        <ThemeProvider theme={theme}>
          <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
          <div className="LoginContainer">
             <div className='loginImgContainer'>
                 <img  src={loginPic1} width='100%' height='100%'></img>
             </div>
             <div className='loginFormContainer'>
                 <div>
                      <img  src={accountLogo} width='70em'></img>
                      <form >
                          <TextField type='email' label='E-mail' color="primary" size='small' inputRef={emailRef} variant="filled"></TextField><br/><br/>
                          <TextField type='password'  label='Password' color="primary" size='small' inputRef={passwordRef} variant="filled"></TextField><br/><br/>
                          <Button variant='contained' size='small' onClick={handleSubmit} disabled={loading}>Login</Button>
                      </form><br></br>
                      <span><Link to='/forgot-password'>Forgot password?</Link></span><br/>
                      <span><Link to='/signup'>Sign up here</Link></span><br/>
                      <span> </span>

                 </div>
             </div>
          </div>
        </ThemeProvider>
        </>
    )
}