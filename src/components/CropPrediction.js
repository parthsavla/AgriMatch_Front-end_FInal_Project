import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import AppBarMenu from './AppBarMenu'
import './cropprediction.css'
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios'
import CropResultsModal from './CropResultsModal';
import { set } from 'firebase/database';

export default function CropPrediction() {
  const nitrogenRef = useRef()
  const potassiumRef = useRef()
  const phosphurousRef = useRef()
  const soilPhRef = useRef()
  const rainfallRef = useRef()
  const cityRef = useRef()
  const [nitrogen,setNitrogen] = useState()
  const [potassium,setPotassium] = useState()
  const [phosphurous,setPhosphurous] = useState()
  const [soilPh,setSoilPh] = useState()
  const [rainfall,setRainfall] = useState()
  const [city,setCity] = useState()


    
  


  const CPinput = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  });
  

  return (  
    <div >
      <AppBarMenu typeOfBar='LoggedInBar'></AppBarMenu>
      <Grid container>
        <Grid item>
          
        </Grid>
        <Grid item >
          <Stack direction={"row"} justifyContent="center">
            <div className='CPtext'>
              <h1>Get the best yield this season</h1>
              <p style={{padding:"2em"}}>
              We will use your research data of soil characteristics, soil types, crop yield data collection and suggest to you the right crop based on your site-specific parameters. This will assist you in reducing the wrong choice on a crop and increase in productivity. The variables you insert will determine the type of crop you will plant to harvest. Our crop selection affects your final yield directly. We will save you time and expense and bring you captivating and promising results. Provide us with your soil information and let us help you maximize production.
              </p>
            </div>  
            <div className='CPform'>  
              <form>
                <InputLabel margin='dense'>
                  Nitrogen in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' value={nitrogen} onBlur={()=>{setNitrogen(nitrogenRef.current.value)}} inputRef={nitrogenRef} />
                <InputLabel>
                  Phosphorous in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' value={phosphurous} onBlur={()=>{setPhosphurous(phosphurousRef.current.value)}} inputRef={phosphurousRef} >

                </CPinput>
                <InputLabel>
                  Potassium in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' value={potassium} onBlur={()=>{setPotassium(potassiumRef.current.value)}} inputRef={potassiumRef} >

                </CPinput >
                <InputLabel>
                  Ph levels in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' value={soilPh} onBlur={()=>{setSoilPh(soilPhRef.current.value)}} inputRef={soilPhRef} >

                </CPinput>
                <InputLabel>
                  Rainfall
                </InputLabel>
                <CPinput size='small' margin='normal' value={rainfall} onBlur={()=>{setRainfall(rainfallRef.current.value)}} inputRef={rainfallRef} >

                </CPinput>
                <InputLabel>
                  Enter the city your farm is located in or the closest one to it
                </InputLabel>
                <CPinput size='small' margin='normal' value={city} inputRef={cityRef} onBlur={()=>{setCity(cityRef.current.value)}} >

                </CPinput><br></br>
                <CropResultsModal
                  nitrogen={nitrogen}
                  potassium={potassium}
                  phosphurous={phosphurous}
                  rainfall={rainfall}
                  soilPh={soilPh} 
                  city={city}
                  />
              </form>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  ) 
}
