import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import cropCardPic from './img/cropCardPic.jpg'
import fertilizerCardPic from './img/fertilizerCardPic.jpg'

export default function ActionAreaCard(props) {
    let pic = props.cardPic
  return (
    <Card sx={{ maxWidth: 345,border:"solid 0.5px #2e7d32" }} elevation={12}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.cardPic === "CCP"?cropCardPic:fertilizerCardPic}
          alt="crop"

        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cardHead}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.cardBody}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}