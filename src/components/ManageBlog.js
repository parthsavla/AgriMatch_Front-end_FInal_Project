import React,{useState,useEffect} from 'react'
import AppBarMenu from './AppBarMenu'
import { Grid, Stack } from '@mui/material';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import BlogDisplayData from './BlogDisplayData';
import BlogSummary from './BlogSummary';

export default function ManageBlog() {
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  let rows = []
  const [chartData, setChartData] = useState({})
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
    for(let i in blogData){
      blogData[i].blogId = i
      rows.push(blogData[i])
    }
    return bdata
}
useEffect(()=>{

    readBlogData()

},[blogDataCount])
  return (
    <div>
      <AppBarMenu typeOfBar='LoggedInBar'></AppBarMenu>
      <Grid container justifyContent={'center'} direction={"column"}>
        <Grid item>
          <BlogDisplayData blgData={blogData}></BlogDisplayData>
        </Grid>
        <Grid item>
          <BlogSummary blgData={blogData}></BlogSummary>
        </Grid>
      </Grid>
    </div>
  )
}
