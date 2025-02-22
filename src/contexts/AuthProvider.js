import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

//create an auth context 
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const authData = useFirebase()
    // alert(JSON.stringify(authData))
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
