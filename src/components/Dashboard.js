import React,{useEffect, useState} from 'react';
import { Alert, AppBar, CircularProgress, Grid,Table,TableBody,TableContainer,Stack, CardHeader, Divider } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotVerifiedEmail from './NotVerifiedEmail';
import AppBarMenu from './AppBarMenu';
import Addblog from './Addblog';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import BlogDisplayData from './BlogDisplayData'
import { useBlog } from '../contexts/BlogContext';
import CardTemplate from './CardTemplate'
import fertilizerCardPic from './img/fertilizerCardPic.jpg'
import cropCardPic from './img/cropCardPic.jpg'
import {Link} from 'react-router-dom'

    
export default function Dashboard() {
  const rows = [];
  const userData =[]
  const [uid,setUid] = useState()
  const {currentUser,} = useAuth()
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  const {splitEmail,readData,writeBlogData,clearArray} = useBlog()
  //const [userData,setUserData] = useState()

//firebase function to read blog data
function readBlogData(){
  const dbBlogQueryRef = query(ref(getDatabase(),'blogs'),orderByChild('blogAuthorId'),equalTo(uid))
  // let bdata = get(dbBlogQueryRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //         console.log(snapshot.val())
  //         return snapshot.val()
  //     } else {
  //         console.log('no doc')
  //     }
  // })
  // return bdata
  let bdata 
    onValue(dbBlogQueryRef,(snapshot)=>{ 
        setBlogdataCount(blogDataCount + 1)
        setBlogdata(snapshot.val())
        console.log(snapshot.val())
    })
    
    return bdata
}

  async function getUserdata(){
    console.log(currentUser.email)
    try {
        await readData(currentUser.email).then((data)=>{
        for(let id in data){
          userData.push(data[id])
        }
       })
    } catch (error) {
      console.log('error from dash board',error)
    }
    
    setUid(userData[0])
    
  }
  useEffect(()=>{
    getUserdata()
    if (uid!=undefined) {
      console.log(uid)
      readBlogData(uid)
    }
    
    return ()=>{
      clearArray(userData)

     }
  },[uid,blogDataCount])

  //condition to check if email is verified
  if(uid != undefined){
    if(currentUser.emailVerified){
      return(
        <div>
            <AppBarMenu typeOfBar="LoggedInBar" ></AppBarMenu>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
              <Grid item margin={5}>
                <Grid container direction='row' alignItems='center'>
                  <Grid item >
                    <BlogDisplayData blgData={blogData}></BlogDisplayData>
                  </Grid>
                  <Grid item>
                    <Addblog></Addblog>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item width={"70%"}>
                <p style={{fontSize:"1.2em"}}>
                We use cutting-edge machine learning technology to assist you in the agricultural process. Make informed decisions about your area's demographics, the elements that effect your crop, and how to keep them healthy for a profitable output. You will need to have your soil tests ready and provide us with the needed variables. Use do-it-yourself kits to test for NPK, pH level and rainfall. 
                </p>
              </Grid>
              <Grid item margin={5}>
                <Stack spacing={2} direction='row' divider={<Divider  orientation='vertical' flexItem></Divider>}>
                  <Link to='/cropPrediction' className='routerLink'>  
                    <CardTemplate
                      cardHead = "Get the best crop to grow this season"
                      cardBody = "We put the findings of your soil test through our machine learning algorithm, which recommends you the best crop to cultivate this season based on weather data from OpenApi. "
                      cardPic="CCP"
                    />
                  </Link>
                  <Link to='/fertilizer' className='routerLink'>  
                    <CardTemplate
                      cardHead = "Recommendations for organic fertilizer "
                      cardPic="FCP"
                      cardBody = "We put the findings of your soil test through our machine learning algorithm, which recommends you the best crop to cultivate this season based on weather data from OpenApi. "

                    />
                  </Link> 
                   
                </Stack>
              </Grid>

            </Grid>
        </div>
      )
    }else if(!currentUser.emailVerified){
      return(
        <div>
          <NotVerifiedEmail/>
        </div>
      )
    }
  }else{
    return(<div><CircularProgress size={150} color="success"></CircularProgress></div>)
  }
}
