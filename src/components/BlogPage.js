import React,{useState,useEffect} from 'react'
import AppBarMenu from './AppBarMenu'
import { Grid, Stack } from '@mui/material';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import BlogDisplayData from './BlogDisplayData';
import BlogListDisplay from './BlogListDisplay';

export default function BlogPage() {
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
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
    <div>
      <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
      <Grid container justifyContent={"center"} direction="column">
        <Grid item xs={8}>
          <BlogListDisplay blgData={blogData}></BlogListDisplay>
        </Grid>
      </Grid>
      
    </div>
  )
}
