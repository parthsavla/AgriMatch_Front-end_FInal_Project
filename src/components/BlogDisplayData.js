import React,{useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useBlog } from '../contexts/BlogContext';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import EditBlog from './EditBlog';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function BlogDisplayData({blgData}) {
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  let rows = []
  const [open, setOpen] = React.useState(false);
  const {splitEmail,delBlog,writeBlogData,clearArray} = useBlog()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  async function handleDelete(blgId){
    console.log(blgId)
    await delBlog(blgId)
    setOpen(true)
  }
  async function handleEdit(blgId){
    console.log(blgId)
    
  }
  
  useEffect(()=>{
    for(let i in blgData){
      blgData[i].blogId = i
      rows.push(blgData[i])
    }

    setBlogdata(rows)
    console.log("data from bdispl",blogData)
    setBlogdataCount(blogDataCount + 1)

    return ()=>{
      clearArray(rows)

     }
  },[blgData])

  if(blogData !== undefined ){
    return (
      <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <TableContainer component={Paper} elevation={8} sx={{height:400}}>
      <Table sx={{ minWidth: 100}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Blog Id</TableCell>
            <TableCell align="right">Blog Title</TableCell>
            <TableCell className='blogTableDate' align="right">Blog Date</TableCell>
            <TableCell className='blogTableDate' align="right">Blog Author</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogData.map((row) => (
            <TableRow
              key={row.blogId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.blogId}
              </TableCell>
              <TableCell align="right">{row.blogTitle}</TableCell>
              <TableCell align="right">{row.blogDate}</TableCell>
              <TableCell align="right" className='blogTableDate'>{row.blogAuthor}</TableCell>
              <TableCell align='center' >
              {/* <IconButton aria-label="delete"  color="success" >
                  <ModeEditTwoToneIcon onClick={()=>{handleEdit(row.blogId)}}/>
            
                </IconButton> */}
                <EditBlog blgData={blgData} blgId={row.blogId}></EditBlog>
                <IconButton aria-label="delete"  color="success" >
                  <DeleteIcon onClick={()=>{handleDelete(row.blogId)}}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
    );
  }else{
    return <div><h1>still loading</h1></div>
  }
}