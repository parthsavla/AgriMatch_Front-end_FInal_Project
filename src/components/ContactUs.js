import { Grid, TextField,InputLabel,TextareaAutosize } from '@mui/material'
import React,{useRef} from 'react'
import AppBarMenu from './AppBarMenu'
import emailjs from '@emailjs/browser';
import './contact.css'

export default function ContactUs() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tze9t7m', 'template_8hehyng', form.current, 'rX1vSkhCVg5lqMoyj')
      .then((result) => {
          console.log(result.text);
          alert("Message Sent")

      }, (error) => {
          console.log(error.text);
      });
  };
  const form = useRef();
  return (
    
    <div>
      <AppBarMenu typeOfBar='mainBar'></AppBarMenu>
      <Grid container direction={'row'} justifyContent="center" spacing={2}>
        <Grid item lg={5}>
          <div style={{color:"white",background:"#029834",padding:"2em",borderRadius:'1.2em'}}>
            <form ref={form} onSubmit={sendEmail}>
            <h2>Contact Us</h2>

            
            <TextField label="Name" type="text" name="user_name" variant='filled' fullWidth  margin='normal'>  </TextField><br></br>
            <TextField  label="Email" type="email" name="user_email" variant='filled' fullWidth margin='normal'>  </TextField><br></br>
            <br/>
            <TextField margin='normal' label="Message" multiline rows={8} name="message" variant='filled' fullWidth></TextField><br/>
            <TextField type="submit" value="Send" style={{width:"40%",padding:"1.2em"}}/>
            
            </form>
          </div>
        </Grid>
        <Grid item lg={6}>
          <h2>We Are located hear</h2>
          <iframe scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=550&amp;height=261&amp;hl=en&amp;q=USIU%20rd%20Nairobi+(AgriMatch%20)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="80%" height="261" frameborder="0"></iframe> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=0964616d4509c4d3dcd7972a0b52542fe8a9f927'></script>
        </Grid>
      </Grid>
    </div>
  )
}
