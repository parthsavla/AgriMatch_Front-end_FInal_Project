import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import placeholder from './img/imgPlaceholder.jpg';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CropResultsModal(props) {
  const [open, setOpen] = React.useState(false);
  const [predictionResults,setPredictionResults] = useState('')
  const handleOpen = () => {
    setOpen(true)
    console.log(props.nitrogen)
    console.log(props.potassium)
    console.log(props.phosphurous)
    console.log(props.rainfall)
    console.log(props.soilPh)
    console.log(props.city)
    axios.post('/cropPredict',{
        n:props.nitrogen,
        k:props.potassium,
        p:props.phosphurous,
        soilPH:props.rainfall,
        rainfall:props.soilPh,
        city:props.city
      }).then((res)=>{
         console.log(res.data)
         setPredictionResults(res.data)
      })
  };
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen} sx={{backgroundColor:"#029834",color:"black"}} variant='contained'>Process Data</Button>
        <Modal
        disableEnforceFocus 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack direction={"row"}>
              <div>
                <img src={predictionResults.PhotoURL} width="200"></img>
              </div>
              <div>
                <Stack direction={"column"} spacing={3}>
                  <div>
                      <span style={{fontWeight:"bolder",paddingRight:'1em'}}>{predictionResults.cropName}</span>
                  </div>
                  <div>
                      <span style={{fontWeight:"bolder",paddingRight:'1em'}}>{predictionResults.cropSciName}</span>
                  </div>
                  <div>
                  <span style={{fontWeight:"bolder",paddingRight:'1em'}}>Days to harvest</span>{predictionResults.cropHarDay}<br/>
                  </div>
                </Stack>
              </div>
              
            </Stack>
            
            
            <br/>
            <span style={{fontSize:'1.2em'}}>
              {predictionResults.cropDesc}<br/>
            </span>
            <Stack direction={'column'} sx={{fontSize:'1.2em'}}>
              <div>
                <span style={{fontWeight:"bolder",paddingRight:'1em'}}> Sun And Temperature</span><br/>
                {predictionResults.cropTemp}<br/>
              </div>
              <div>
                <span style={{fontWeight:"bolder",paddingRight:'1em'}}> Water and Humidity</span><br/>
                {predictionResults.cropWater}<br/>
              </div>
            </Stack>
            
                <Link to='/fullCropResults' state={{data:predictionResults}}> Read More</Link>  
          </Typography>
        </Box>
      </Modal>
  
      
    </div>
  );
}
