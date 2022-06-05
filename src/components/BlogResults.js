import React,{useState} from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { BlogProvider,useBlog } from '../contexts/BlogContext';


export default function BlogResults() {
  const {splitEmail,readData,writeBlogData,readBlogData} = useBlog()
  const [blogBody,setBlogBody] = useState()
  async function handleShow(){
      let x = readBlogData("4ca401c0-9d3f-11ec-aebf-e7dbda0603bc")
      let b = x['blogBody']
      setBlogBody(b)
      console.log(blogBody)
  }  
  return (
    <BlogProvider>
    <div>
        <h1>das</h1>
        <button onClick={handleShow}>Show</button>
        <ReactMarkdown>
            {
                blogBody
            }
        </ReactMarkdown>
    </div>
    </BlogProvider>
  )
}
