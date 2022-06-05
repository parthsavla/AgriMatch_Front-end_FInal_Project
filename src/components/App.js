import AppBarMenu from './AppBarMenu';
import './App.css';
import Home  from './Home'
import Signup from './Signup'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword'
import NotVerifiedEmail from './NotVerifiedEmail'
import SignupAdmin from './SignupAdmin';
import AdminDashboard from './AdminDashboard';
import BlogResults from './BlogResults';
import { BlogProvider } from '../contexts/BlogContext';
import axios from 'axios'
import { useEffect, useState } from 'react';
import CropPrediction from './CropPrediction';
import FertilizerPredition from './FertilizerPredition';
import FullCropResults from './FullCropResults';
import BlogListCard from './BlogListCard';
import ManageBlog from './ManageBlog'
import ManageUser from './ManageUser';
import BlogPage from './BlogPage';
import FullBlogDisplay from './FullBlogDisplay';
import ContactUs from './ContactUs';

function App() {
  const [answers,setAnswers] = useState()
  const steps = [
    {
      id: 1,
      content: "Hello There, Did we meet your expectations?",
      receiveInput:true,
      goTo:2,
      
    
    },
    {
      id: 2,
      content: "How would you rate your interaction with our system?",
      receiveInput:true,
      goTo:3
    
    },
    {
      id: 3,
      content: "Was it easy to get the results?",
      receiveInput:true,
      goTo:4
    
    },
    {
      id: 4,
      content: "How could we have exceeded your expectations?",
      receiveInput:true,
      goTo:5
    
    },
    {
      id: 5,
      content: "Is there anything else you would like us to know about your experience?",
      receiveInput:true,
      goTo:6
    
    }, 
    {
      id: 6,
      content: "Were we able to satisfy your need?",
      end: true
    }
  ];
  return (

    <AuthProvider>
      <BlogProvider>
    <Router>
      <div className="App">
    
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route exact path='/signupAdmin' element={<SignupAdmin/>}></Route>
          <Route exact path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route exact path='/dashboard' element={
                                                  <PrivateRoute>
                                                    <Dashboard/>
                                                  </PrivateRoute>  
                                                  }>


          </Route>
          <Route exact path='/dashboard' element={
                                                  <PrivateRoute>
                                                    <Dashboard/>
                                                  </PrivateRoute>  
                                                  }>


          </Route>
          <Route exact path='/emailNotVerified' element={<NotVerifiedEmail/>}/>
          <Route exact path='/adminDash' element={<AdminDashboard/>}/>
          <Route exact path='/cropPrediction' element={<CropPrediction/>}/>
          <Route exact path='/t' element={<BlogResults/>}/>
          <Route exact path='/fertilizer' element={<FertilizerPredition/>}/>
          <Route exact path='/fullCropResults' element={<FullCropResults/>}/> 
          <Route exact path='/bloglist' element={<BlogListCard/>}/> 
          <Route exact path='/manageBlog' element={<ManageBlog/>}/> 
          <Route exact path='/manageUser' element={<ManageUser></ManageUser>}/> 
          <Route exact path='/blogPage' element={<BlogPage/>}/> 
          <Route exact path='/fullBlogDisplay' element={<FullBlogDisplay/>}/> 
          <Route exact path='/contactUs' element={<ContactUs/>}/>
        </Routes>
       
      </div>
    </Router>
    </BlogProvider>
    </AuthProvider>
  );
}

export default App;
