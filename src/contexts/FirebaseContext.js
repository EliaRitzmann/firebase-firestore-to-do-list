import { createContext, useContext, useEffect, useState } from "react";

//Firebase connection
import {auth} from "../api/firebase"

//Firebase functions
import {
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithRedirect
} from "firebase/auth"

//Create Context
const userAuthContext = createContext();

//Provider
const googleProvider = new GoogleAuthProvider();

export function useAuth(){
    return useContext(userAuthContext);
}

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function googleLogin(){
        return signInWithRedirect(auth, googleProvider);
    }


    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscribe
    }, []);

    const value = {
        user,
        logOut,
        googleLogin
    }

    return(
        <userAuthContext.Provider value={value}>     
            {!loading && children}
        </userAuthContext.Provider>
    )
}