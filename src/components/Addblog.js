import  React,{useRef,useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Modal,TextField,Button} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import MarkDownEditorCompEditPage from './MarkDownEditorCompEditPage';
import { upload } from '@testing-library/user-event/dist/upload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height:"98%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Addblog() {
  const [open, setOpen] = React.useState(false);
  let userdata = []
  const [fullName, setFullName] = React.useState();
  const handleOpen =  async () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const blogBodyRef = useRef()
  const {currentUser} = useAuth()
  const {splitEmail,readData,writeBlogData} = useBlog()

  return (
    
    <div>
      <Button onClick={handleOpen} variant="contained" color='success' style={{padding:"30%",marginLeft:"30%"}}>Add Blog</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MarkDownEditorCompEditPage userEmail={currentUser.email}></MarkDownEditorCompEditPage>
        </Box>
      </Modal>
    </div>
  );
}