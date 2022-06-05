import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { border } from '@mui/system';
import { useAuth } from '../contexts/AuthContext';
import seed from './img/seedIcon.png'
import seedling from './img/seedling.png'
import sprout from './img/sprout.png'
import logOutIcon from './img/logout_white.svg'
import accountLogo from './img/accountLogo.png'
import {Link,useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}



export default function AppBarMenu(props) {
  const {currentUser,logout} = useAuth()
  const [error,setError] = useState('')
  const navigate = useNavigate
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  async function handleLogout(){
    setError('')
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
}
  const logoContainer ={
    textAlign:"left",
    paddingLeft:"60px",
    marginRight:'15%'
  }
 console.log(props.typeOfBar)
if(props.typeOfBar === "mainBar"){
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="static" sx={{background:"#029834"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              AGRiMATCH
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              <Grid container direction={'column'} spacing={4} >
              <Grid item>
                <Link to='/'>
                  <span style={{padding:'1.5em',textAlign:'center'}}>Home</span>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/blogPage'>
                  <span style={{padding:'1.5em'}}>Blog</span>
                </Link>
              </Grid>
                
              <Grid item>
                <Link to='/ContactUs'>
                  <span style={{padding:'1.5em'}}>Contact Us</span>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/login'>
                  <span style={{padding:'1.5em'}}>Login</span>
                </Link>
              </Grid>
            </Grid>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              AGRiMATCH
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
            </Box>

            <Box sx={{ flexGrow: 0,display: { xs: 'none', md: 'flex' } }}>
            <Grid container direction={'row'} spacing={2} alignItems="center" >
            <Grid item xs={2}>
                  <Link to='/'>
                    <span style={{color:'white',textDecoration:'none'}}>Home</span>
                  </Link>
                </Grid>
                <Grid item>
                  <img src={seed} width='35' ></img>
                </Grid>
                <Grid item xs={2}>
                  <Link to='/blogPage'>
                    <span style={{color:'white',textDecoration:'none'}}>Blog</span>
                  </Link>
                </Grid>
                <Grid item>
                  <img src={sprout} width='35'></img>
                </Grid>
                <Grid item xs={2}>
                <Link to='/ContactUs'>
                  <span style={{color:'white'}}>Contact Us</span>
                </Link>
                </Grid>
                  <Grid item>
                    
                  </Grid>
                  <Grid item xs={1}>
                    <Link to='/login'>
                      <img src={accountLogo} width='35'></img>
                    </Link>
                  </Grid>
            </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>

  )
}else if(props.typeOfBar === "LoggedInBar"){
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="static" sx={{background:"#029834"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              AGRiMATCH
            </Typography>
    
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              <Grid container direction={'column'} spacing={4} >
              <Grid item>
                <Link to='/dashboard'>
                  <span>Home</span>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/blogPage'>
                  <span>Blog</span>
                </Link> 
              </Grid>
              <Grid item>
                <Link to='/blogPage'>
                  <span>Contact</span>
                </Link>  
              </Grid>
              <Grid item>
                  <div onClick={handleLogout}>
                    Log Out
                  </div>
              </Grid>
            </Grid>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              AGRiMATCH
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
            </Box>
              
            <Box sx={{ flexGrow: 0,display: { xs: 'none', md: 'flex' } }}>
            <Grid container direction={'row'} spacing={4} alignItems="center" justifyContent={"center"}>
                <Grid item xs={2}>
                  <Link to='/dashboard'>
                    <span style={{color:'white',textDecoration:'none'}}>Home</span>
                  </Link>
                </Grid>
                <Grid item>
                  <img src={seed} width='25' ></img>
                </Grid>
                <Grid item xs={2}>
                  <Link to='/blogPage'>
                    <span style={{color:'white',textDecoration:'none'}}>Blog</span>
                  </Link>
                </Grid>
                <Grid item xs={1}>
                <img src={sprout} width='25' xs={1}></img>
                </Grid>
                <Grid item xs={2}>
                <Link to='/ContactUs'>
                  <span style={{padding:'1.5em',textAlign:"center",color:'white',textDecoration:'none'}}>Contact</span>
                </Link>
                </Grid>
                  <Grid item>
                    
                  </Grid>
                  <Grid item xs={1}>
                  <a onClick={handleLogout}>
                    <img src={logOutIcon} xs={1} width='35'></img>
                  </a>
                  </Grid>
            </Grid>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>

  )
}
}