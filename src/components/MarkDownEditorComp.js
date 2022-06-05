// import react, react-markdown-editor-lite, and a markdown parser you like
import React,{useState,useRef} from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { useBlog } from '../contexts/BlogContext';
import {useAuth} from '../contexts/AuthContext'
import {TextField,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1, v1 } from 'uuid';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';


export default function MarkDownEditorComp(props){
const [markDownTxt,setMarkDownTxt] = useState()
const {splitEmail,readData,writeBlogData} = useBlog()
const {hashCode} = useAuth()
const blogTitleRef = useRef()
const navigate = useNavigate()
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// This function can convert File object to a datauri string
function onImageUpload(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  
async function handleSave(e){
  e.preventDefault()
  try {
    let x  =   await readData(props.userEmail)
    let fullName = x["fname"] + " " + x['lname']
    console.log(x['UserId'])
    let blogId = v1()
    await writeBlogData(blogId,blogTitleRef.current.value,markDownTxt,fullName,x['UserId'])
    //window.location.reload()
  } catch (error) {
    console.log(error)
  }
 
}
// Finish!
function handleEditorChange({ html, text }) {
  setMarkDownTxt(text)
}
  console.log(props.blgData['blogTitle'])
  return (
    <>
    <TextField defaultValue={props.blgData['blogTitle']}  fullWidth  required type='text' size='small' inputRef={blogTitleRef} variant="outlined" label="Blog Tile" margin='normal' color='success'></TextField><br/>
    <MdEditor style={{ height: '70%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} onImageUpload={onImageUpload} value={props.blgData['blogBody']} />
    <Button  variant='contained' color='success' size='medium' onClick={handleSave}  style={{marginTop:"10px"}}>Publish Blog </Button>

    </>
  )
};