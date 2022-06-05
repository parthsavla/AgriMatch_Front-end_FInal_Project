import './signup.css'
import loginPic1 from './img/loginPic1.jpg'
import signupIcon from './img/signupIcon.png'
import accountLogo from './img/accountLogo.png'
import React,{useRef, useState} from  'react'
import {Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppBarMenu from './AppBarMenu'
import { Alert,TextField,Button } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { v1 as uuidv1, v1 } from 'uuid';
import Stack from '@mui/material/Stack';

export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const fnameRef = useRef()
    const lnameRef = useRef()
    const telRef = useRef()
    const passwordConfirmationRef = useRef()
    const {signup,currentUser,verifyEmail} =useAuth()
    const [error,serError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const theme = createTheme({
        palette: {
          primary: {
            main:'rgb(243, 243, 243)'
          },
        },
      });


    async  function handleSubmit(e){
        e.preventDefault()
        const encodedEmail = "CL-" + v1()
        if(passwordRef.current.value !== passwordConfirmationRef.current.value){
            console.log('Passwords do not match')
            return serError('Passwords do not match')
        }
        try {
            serError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value,encodedEmail,fnameRef.current.value,lnameRef.current.value,telRef.current.value)
            verifyEmail()
            alert('user created')
            navigate('/login')

            
        } catch(error){
            serError('failed to create an account')
            console.log(error)
        }
        setLoading(false)
        
    }
    return(
        <>
        <ThemeProvider theme={theme}>
                <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
                <div className="signupContainer">
                    <div className='signImgContainer'>
                       <img src={loginPic1} width='100%' height='100%'></img>
                   </div>
                   <div className='signupFormContainer'>
                       <div>
                            {error && <Alert variant="filled" severity="error">{error}</Alert>}
                            <img src={signupIcon} width='70em'></img>
                            <form>
                                {/*<input className='inputFields' type='text' placeholder='First Nane'  required></input><br/><br/>
                                <input className='inputFields' type='text' placeholder='Surname'></input><br/><br/>*/}
                                <TextField type='text' margin='normal' label='First Name' color="primary" size='small' inputRef={fnameRef} variant="filled" style={{marginRight:"10px"}} required={true}></TextField>   
                                <TextField type='text' margin='normal' label='Last Name' color="primary" size='small' inputRef={lnameRef} variant="filled" style={{marginRight:"10px"}} required></TextField>
                                <TextField type='tel' margin='normal' label='Phone Number' color="primary" size='small' inputRef={telRef} variant="filled" style={{marginRight:"10px"}} required></TextField>
                                <TextField type='email' margin='normal' label='E-mail' color="primary" size='small' inputRef={emailRef} variant="filled" style={{marginRight:"10px"}} required></TextField>
                                <TextField type='password'  margin='normal' label='Password' color="primary" size="small" inputRef={passwordRef} variant="filled" style={{marginRight:"10px"}} required></TextField>
                                <TextField type='password' margin='normal' label='Comfirm Password' color="primary" size='small' inputRef={passwordConfirmationRef} variant="filled" required></TextField><br></br>
                                <Button variant='contained' size='medium' onClick={handleSubmit} disabled={loading} style={{marginTop:"10px"}}>Sign up</Button>
                            </form>
                            <br></br>
                            <span>Already have an account<Link to='/login'> Login here</Link></span>
                       </div>
                   </div>
                </div>
        </ThemeProvider>
        </> 
    )
}