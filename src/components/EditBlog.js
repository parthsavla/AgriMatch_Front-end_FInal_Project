import  React,{useRef,useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Modal,TextField,Button} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import MarkDownEditorComp from './MarkDownEditorComp';
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

export default function EditBlog({blgData,blgId}) {
  const [open, setOpen] = React.useState(false);
  const [editBlogData,setEditBlogData] = React.useState()
  let userdata = []
  const [fullName, setFullName] = React.useState();
  const blogBodyRef = useRef()
  const {currentUser} = useAuth()
  const {splitEmail,readData,writeBlogData,readBlogData} = useBlog()

  const handleOpen =  async () => {
    setOpen(true)
   
  };
  const handleClose = () => setOpen(false);

  console.log('blog data inedit ',blgData)
  console.log('blog id',blgId)
  useEffect(()=>{
    for(let id in blgData){
      if(id === blgId){
        setEditBlogData(blgData[id])
      }
    }
  })
  console.log(editBlogData)
  return (
   
    <div>
      <Button onClick={handleOpen} size='small' variant="text" color='success'>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MarkDownEditorComp userEmail={currentUser.email} blgData={editBlogData}></MarkDownEditorComp>
        </Box>
      </Modal>
    </div>
  );
}