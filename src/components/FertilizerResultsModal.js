import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import { Stack } from '@mui/material';
import ReactMarkdown from 'react-markdown';
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
  const [fertResults,setFertResults] = useState('')
  const handleOpen = () => {
    setOpen(true)
    console.log(props.nitrogen)
    console.log(props.potassium)
    console.log(props.phosphurous)
    console.log(props.crop)

     axios.post('/fertRecommendation',{
        n:props.nitrogen,
        k:props.potassium,
        p:props.phosphurous,
        crop:props.crop,
      }).then((res)=>{
          console.log(res.data)
          setFertResults(res.data)
         //setPredictionResults(res.data)
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
          <ReactMarkdown>
            {fertResults}
          </ReactMarkdown>
          <Button  variant='contained' size='large' onClick={() => window.print()} sx={{background:"#029834"}}>PRINT</Button>
        </Box>
      </Modal>
  
      
    </div>
  );
}
