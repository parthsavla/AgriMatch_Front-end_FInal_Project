import React,{useState,useEffect} from 'react'
import AppBarMenu from './AppBarMenu';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import { Grid } from '@mui/material';
import UserDisplayData from './UserDisplayData'


export default function ManageUser() {
  let [userData,setUserData] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  let rows = []
  const [chartData, setChartData] = useState({})
  //firebase function to read blog data
function readUserData(){
  const dbBlogQueryRef = query(ref(getDatabase(),'users'))

  let bdata 
    onValue(dbBlogQueryRef,(snapshot)=>{ 
        setBlogdataCount(blogDataCount + 1)
        setUserData(snapshot.val())
        console.log(snapshot.val())
    })
    for(let i in userData){
      userData[i].blogId = i
      rows.push(userData[i])
    }
    return bdata
}

  useEffect(()=>{
    readUserData()
  },[])
  return (
    <div>
      <AppBarMenu typeOfBar='LoggedInBar'></AppBarMenu>
      <Grid container justifyContent={'center'} direction={"column"}>
        <Grid item>
          <UserDisplayData usrData={userData}></UserDisplayData>
          
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </div>
  )
}
