import React,{useEffect,useState} from 'react';
import { useBlog } from '../contexts/BlogContext';
import { Chart } from "react-google-charts";
export default function BlogSummary({blgData}) {
  let [blogData,setBlogdata] =useState()
  let [blogDataCount,setBlogdataCount] =useState()
  let [blogDateArray,setBlogDateArray] = useState() 
  let [todaysBlogPost,setTodaysBlogPost] = useState()
  let rows = []
  let todaysBlogPostArray = []

  const {splitEmail,delBlog,writeBlogData,clearArray} = useBlog()
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
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() +1
    let year = date.getFullYear()
    let fullDate = day+"/"+month+"/"+year

    blogData.forEach(element => {
      if(element['blogDate'] === fullDate){
        todaysBlogPostArray.push(element['blogDate'])
        
      }
      console.log("blogs added today",todaysBlogPostArray)
    });
    let blogDateArray = []
    blogData.forEach(element => {
      blogDateArray.push(element['blogDate'])
      
    });
    const counts = {};
    let DateNumberChartData = [["Date", "Number of blogs"]]
    blogDateArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log(counts)
    for(let i in counts){
      DateNumberChartData.push([i,counts[i]])
    }

  return (
    <div>
      <h1>Blog Summary</h1>
      <span>Total blogs</span>
      <h1>{blogData.length}</h1>
      <span>Total blogs today</span>
      <h1>{todaysBlogPostArray.length}</h1><br></br>
      
      <Chart
        chartType="LineChart"
        data={DateNumberChartData}
        width="80%"
        height="400px"
        legendToggle
        style={{margin:"auto"}}
      />
      
    </div>
  )
}else{
  return <div><h1>still loading</h1></div>
}
}
