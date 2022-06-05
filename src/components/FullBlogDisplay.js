import { Button, Grid } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import AppBarMenu from './AppBarMenu';
import placeholder from './img/imgPlaceholder.jpg';
import { Stack } from '@mui/material';
import ReactMarkdown from 'react-markdown';


export default function FullBlogDisplay() {
  const location = useLocation()
  const blogTitle = location.state?.blogTitle;
  const blogBody = location.state?.blogBody;
  console.log(blogTitle)
  return (
    <div>
      <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
      <div style={{width:"80%",margin:"auto"}}>
      <Grid container direction={'column'} justifyContent={'center'}>
        <Grid item>
          Advertisement baner 
        </Grid>
        <Grid item>
          <ReactMarkdown>
            {blogBody}
          </ReactMarkdown>
        </Grid>
      </Grid>
      </div>
    </div>
  )
}
