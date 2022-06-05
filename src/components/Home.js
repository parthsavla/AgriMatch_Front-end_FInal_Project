import zIndex from '@mui/material/styles/zIndex'
import coverPic from './img/cover_pic.png'
import blogPic from './img/blogPic.jpg'
import AppBarMenu from './AppBarMenu'
import './App.css'

export default function Home(props){
    return(
        <div>
            <AppBarMenu typeOfBar="mainBar"></AppBarMenu>
        <div className='homeCont'>
           
        </div>
        <div class="bg-text">
        <h1>Improving Farming, Improving Life </h1>
        <h2>Raise farm productivity and boost growth by growing high-yield crops, increasing the use of fertilizers, and making better use of information technology.</h2>
        </div>
        </div>
        
    )
}