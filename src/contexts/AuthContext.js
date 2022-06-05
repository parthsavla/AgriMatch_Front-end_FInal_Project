import React, { useContext,useState,useEffect } from 'react';
import {auth} from '../firebase'
import {createUserWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword,signOut,sendEmailVerification  } from "firebase/auth";
import { child, get, getDatabase,ref, set,remove } from "firebase/database";
import {addDoc,setDoc, collection, getFirestore,doc} from 'firebase/firestore'
const AuthContext = React.createContext()
//function that allows us to use the context 
export function useAuth(){
    return useContext(AuthContext)
}

// auth context provider 
export  function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)
    
    let dashFlag
    const dbRef = ref(getDatabase());

    //helper function to split the emails
    function splitEmail(email){
        const emailString = email.split('@')
        return emailString
    }
    //helper function to hash
    function hashCode(str) {
        return str.split('').reduce((prevHash, currVal) =>
          (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
      }
    function delUserData(id){
        console.log("dele id from auth context",id)
        return remove(ref(getDatabase(),'/users/'+ id))
    }
    //firebase function for realtime database to read user data to check which dash board to display
    function readUserData(email){
        const emailString = splitEmail(email)
        let userList = []
        get(child(dbRef,`users/${emailString[0]}`)).then((snapshot)=>{
            if(snapshot.exists()){

                let x = snapshot.val()
                for(let id in x){
                    userList.push(x[id])
                }
                
                if(userList[0].split("-")[0] == "CL"){
                    dashFlag = "client"
                }else if(userList[0].split("-")[0] == "ADM"){
                    dashFlag = "admin"
                }
            }else{
                console.log("No data available");

            }
        })
        return dashFlag
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
    //firebase function to sign up with an email and password 
    function signup(email,password,encodedEmail,fname,lname,tel){ 
        writeUserData(email,encodedEmail,fname,lname,tel)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //firebase function to login
    function login(email,password){
        readUserData(email)
        return signInWithEmailAndPassword(auth,email,password)
    }
    //firebase function to log out
    function logout(){
        return signOut(auth)
    }
    //firebase function to reset password
    function resetPassword(email){
        return sendPasswordResetEmail(auth,email)
    }
    //firebase function to verify email
    function verifyEmail(){
        return sendEmailVerification(auth.currentUser)
    }
    //firebase function that notifies you when the user gets set 
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        verifyEmail,
        readUserData,
        dashFlag,
        hashCode,
        delUserData

    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
