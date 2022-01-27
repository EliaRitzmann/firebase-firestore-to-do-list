import { createContext, useContext, useEffect, useState } from "react";

//Firebase connection
import {auth} from "../api/firebase"

//Firebase functions
import {
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup
} from "firebase/auth"

import {
    doc, 
    setDoc
} from "firebase/firestore";

//Create Context
const userAuthContext = createContext();

//Provider
const googleProvider = new GoogleAuthProvider();

export function useAuth(){
    return useContext(userAuthContext);
}

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState({});


    function googleLogin(){
        return signInWithRedirect(auth, googleProvider);
        
    }


    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            if(currentUser){
                setUser(currentUser);
            }
            else{
                setUser(null)
            }
            
        });
        return () => {
            unsubscribe();
        }
    }, []);

    function createDoc(){
        return setDoc()
    }

    return(
        <userAuthContext.Provider value={{user, logOut, googleLogin}}>
            {children}
        </userAuthContext.Provider>
    )
}