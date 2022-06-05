import React, { useContext,useState,useEffect } from 'react';
import { child, get, getDatabase,query,ref, set,onChildAdded,onValue, equalTo,orderByChild,remove } from "firebase/database";
import { getStorage, ref as storeRef } from "firebase/storage";
import { getAuth } from "firebase/auth";

const BlogContext = React.createContext()
//function that allows us to use the context 
export function useBlog(){
    return useContext(BlogContext)
}
//clear array helper function

// auth context provider 
export  function BlogProvider({children}) {
    const dbRef = ref(getDatabase());
    const storage = getStorage();
    const storageRef = storeRef(storage);

    //helper function to split the emails
    function splitEmail(email){
        const emailString = email.split('@')
        return emailString
    }
    function clearArray(ar){
        while(ar.length > 0) {
            ar.pop();
      }
       }
    //firebase function for read user data from realtime time database
    function readData(email){
        const splitEmailvar = splitEmail(email)
        let udata
        udata = get(child(dbRef,`users/${splitEmailvar[0]}`)).then((snapshot)=>{
            if(snapshot.exists()){
             return udata = snapshot.val()
                
            }else{
                console.log("No data available")
            }
        })
        return udata
    }

    //fire base function sto dele a blog
    function delBlog(bid){
        console.log('bid',bid)
        return remove(ref(getDatabase(),`blogs/${bid}`))
    }
    //firebase function to read blog data
    function readBlogData(uid){
        console.log('uid',uid)
        const dbBlogQueryRef = query(ref(getDatabase(),`blogs`),orderByChild('blogAuthorId'),equalTo(uid))
        // let bdata = get(dbBlogQueryRef).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log(snapshot.val())
        //         return snapshot.val()
        //     } else {
        //         console.log('no doc')
        //     }
        // })
        // return bdata
        let blogData = onValue(dbBlogQueryRef,(snapshot)=>{
            return snapshot.val()
        })
        console.log('data from blog contxt',blogData)
        return blogData
        
    }
    //firebase function to add blog to the database
    function writeBlogData(blogId,blogTitle,blogBody,blogAuthor,blogAuthorId){
        const db = getDatabase();
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() +1
        let year = date.getFullYear()
        let fullDate = day+"/"+month+"/"+year
        set(ref(db,`/blogs/`+blogId),{
            blogTitle:blogTitle,
            blogBody:blogBody,
            blogAuthor:blogAuthor,
            blogAuthorId:blogAuthorId,
            blogDate:fullDate
        })
    }
    //firebase function for realtime database to write new users
    function writeUserData(email,encodedEmail,fname,lname,tel){
        const db = getDatabase();
        const emailString = splitEmail(email)
        console.log(emailString)
        set(ref(db,'/users/'+emailString[0]),{
            UserId: encodedEmail,
            email: email,
            fname: fname,
            lname: lname,
            tel:tel
        })
    }
    const value = {

        readData,
        splitEmail,
        writeBlogData,
        readBlogData,
        delBlog,
        clearArray

    }
    return(
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}
