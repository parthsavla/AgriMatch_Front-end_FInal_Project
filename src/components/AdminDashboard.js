import React,{useState,useEffect} from 'react'
import AppBarMenu from './AppBarMenu'
import { Grid,Card,CardContent,CardActionArea, Stack, Divider } from '@mui/material';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import BlogDisplayData from './BlogDisplayData';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import manageBlogIcon from './img/manageBlogIcon.png'
import {Link} from 'react-router-dom'
import maneUserIcon from './img/outline_manage_accounts_black_48dp.png'
export default function AdminDashboard() {
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  let [blogDataLen,setBlogdataCountLen] =useState()
  

  //firebase function to read blog data
  function readBlogData(uid){
    console.log('uid',uid)
    const dbBlogQueryRef = query(ref(getDatabase(),'blogs'))
  
    let bdata 
      onValue(dbBlogQueryRef,(snapshot)=>{ 
          setBlogdataCount(blogDataCount + 1)
          setBlogdata(snapshot.val())
          console.log(snapshot.val())
          
      })
      
      return bdata
  }
useEffect(()=>{

    readBlogData()
  
},[blogDataCount])
  return (
    <div >
    <AppBarMenu typeOfBar='LoggedInBar'></AppBarMenu>
      <Grid container justifyContent={"center"} direction="column">
        <Grid item>
          <Stack direction={"row"} justifyContent={"center"} spacing={4} alignItems="center">
            <Card sx={{maxWidth:600,width:'100%',height:'70%'}}>
              <Link to='/manageBlog'>
                <CardActionArea>
                  <CardContent>
                    <img src={manageBlogIcon} width={'30%'}></img><br></br>
                    <h1 style={{color:"black",textDecoration:"none"}}>Manage Blog</h1>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
            <Card sx={{maxWidth:600,width:'100%'}}>
            <Link to='/manageUser'>
              <CardActionArea>
                <CardContent>
                  <img src={maneUserIcon} width={'30%'}></img><br></br>
                  <h1 style={{color:"black",textDecoration:"none"}}>Manage User</h1>
                </CardContent>
              </CardActionArea>
            </Link>
            </Card>
          </Stack>
        </Grid>
        
      </Grid>
    </div>
  )
}
