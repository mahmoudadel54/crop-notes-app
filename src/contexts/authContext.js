import React, {createContext, useContext, useEffect, useState} from 'react'
import { auth } from '../firebase';

const AuthContext = createContext();

export default function AuthProvider(props) {

    const [currentUser, setCurrentUser] = useState();
    const [isLogged, setIsLogged] = useState(false);
   

    //it should run after submitting the signup form --> will create new user
    function signup(email, password) {
        //promise will be returned
        return auth.createUserWithEmailAndPassword(email, password);
    }
    //it should run after submitting the login form 
    function login(email, password) {
        //promise will be returned
        return auth.signInWithEmailAndPassword(email, password);
    }
  
    function logout() {
        return auth.signOut();
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        isLogged,
        setIsLogged
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

//instead authContext in components
export function useAuth() {
    return useContext(AuthContext);
}
