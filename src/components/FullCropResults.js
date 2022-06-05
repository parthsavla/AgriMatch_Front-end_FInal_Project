import { Button, Grid } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import AppBarMenu from './AppBarMenu';
import placeholder from './img/imgPlaceholder.jpg';
import { Stack } from '@mui/material';

export default function FullCropResults(props) {
  const location = useLocation()
  const data = location.state?.data;

  console.log(data)
  return (
    <Grid container direction={'column'} justifyContent='center' alignItems='center' sx={{marginBottom:"2em"}}>
        <AppBarMenu typeOfBar='LoggedInBar'></AppBarMenu>
      <Grid item lg={8} sx={{marginTop:"2em"}} spacing={3}>
      <Stack direction={"row"} justifyContent={'center'} alignItems='center' spacing={3}>
              <div>
                <img src={data.PhotoURL} width="400"></img>
              </div>
              <div>
                <Stack direction={"column"} spacing={4} alignContent={"center"} justifyContent="center">
                  <div>
                      <span style={{fontWeight:"bolder",paddingRight:'1em',fontSize:'1.4em'}}>{data.cropName}</span>
                  </div>
                  <div>
                      <span style={{fontWeight:"bolder",paddingRight:'1em',fontSize:'1.4em'}}>{data.cropSciName}</span>                  </div>
                  <div>
                    <span style={{fontWeight:"bolder",paddingRight:'1em',fontSize:'1.4em'}}>Days to harvest {data.cropHarDay}</span><br/>
                  </div>
                  <div>
                    
                  </div>
                </Stack>
              </div>
              
            </Stack>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.cropDesc}</span><br/>
            <span style={{fontWeight:"bolder",paddingRight:'1em'}}><h2>Sun and Temperature</h2></span><br/>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.cropTemp}</span><br/>
            <span style={{fontWeight:"bolder",paddingRight:'1em'}}><h2>Water</h2></span><br/>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.cropWater}</span><br/>
            <span style={{fontWeight:"bolder",paddingRight:'1em'}}><h2>Harvest</h2></span><br/>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.cropHarvest}</span><br/>
            <span style={{fontWeight:"bolder",paddingRight:'1em'}}><h2>Storing</h2></span><br/>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.cropStoring}</span><br/>
            <span style={{fontWeight:"bolder",paddingRight:'1em'}}><h2>Nutritional Benefits</h2></span><br/>
            <span style={{paddingRight:'1em',fontSize:'1.4em'}}>{data.finalcropNutri}</span><br/>
      </Grid>
      <Grid item sx={{marginTop:'2em'}}>
      <Button  variant='contained' size='large' onClick={() => window.print()} sx={{background:"#029834"}}>PRINT</Button>

      </Grid>
    </Grid>
  )
}
