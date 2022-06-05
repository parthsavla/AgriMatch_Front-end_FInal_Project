import { Button, Grid, InputLabel, Stack, TextField ,MenuItem} from '@mui/material'
import React, { useRef, useState } from 'react'
import AppBarMenu from './AppBarMenu'
import './cropprediction.css'
import { alpha, styled } from '@mui/material/styles';
import FertilizerResultsModal from './FertilizerResultsModal'

export default function FertilizerPredition() {
  const nitrogenRef = useRef()
  const potassiumRef = useRef()
  const phosphurousRef = useRef()
  const cropRef = useRef()

  const [n,setN] = useState()
  const [k,setK] = useState()
  const [p,setP] = useState()
  const [crop,setCrop] = useState()
  const [cropType, setCropType] = useState('rice');
  function setValues(){
    setN(nitrogenRef.current.value)
    setK(potassiumRef.current.value)
    setP(phosphurousRef.current.value)
    setCrop(cropType)
  }
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
  let cropSelectOption = ['rice','maize','chickpea','kidneybeans','pigeonpeas','mothbeans','mungbean','blackgram','lentil','pomegranate','banana','mango','grapes','watermelon','muskmelon','apple','orange','papaya','coconut','cotton','jute','coffee']
  const handleChange = (event) => {
    setCropType(event.target.value);
    setValues()
  };
  return (  
    
    <div>
      <Grid container direction={'column'} spacing={1}>
        <Grid item>
          <AppBarMenu typeOfBar="LoggedInBar"></AppBarMenu>
        </Grid>
        <Grid item >
          <Stack direction={{lg:"row",xs:"column"}} justifyContent="center">
            <div className='CPtext'>
              <h1>Get the best yield this season</h1>
              <p style={{padding:"2em"}}>
                The three numbers on fertilizer represents the value of the three macro-nutrients used by plants. These macro-nutrients are nitrogen (N), phosphorus (P), and potassium (K), or NPK for short. All plants need nitrogen, phosphorus, and potassium to grow. Without enough of any one of these nutrients, a plant will fail. We will tell you if a certain value is low for a crop that you would like to plant and measures you can take to solve that.
              </p>
            </div>  
            <div className='CPform'>  
              <form>
                <InputLabel margin='dense'>
                  Nitrogen in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' inputRef={nitrogenRef}/>
                <InputLabel>
                  Phosphorous in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' inputRef={phosphurousRef}>

                </CPinput>
                <InputLabel>
                  Potassium in your soil
                </InputLabel>
                <CPinput size='small' margin='normal' inputRef={potassiumRef}>

                </CPinput >
                <InputLabel>
                  Crop you to grow
                </InputLabel>
                
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={cropType}
                  helperText="Please select your currency"
                  onChange={handleChange}
                >
                  {cropSelectOption.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br/>
                <FertilizerResultsModal

                  nitrogen={n}
                  potassium={k}
                  phosphurous={p}
                  crop={cropType}
                ></FertilizerResultsModal>
              </form>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  ) 
}
