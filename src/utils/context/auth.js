import React, { useState, useContext, createContext } from "react";
// import { useDispatch } from 'react-redux'
// import { tokenFetch } from 'services/token'
// import { login } from 'services/login'



/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
   const auth = useProvideAuth()
   return (
     <authContext.Provider value={auth}>
       {children}
     </authContext.Provider>
   );
 }
 
export const useAuth = () => {
   return useContext(authContext)
}
 
export const useProvideAuth = () => {
    
   const [user, setUser] = useState(null)

   const setAuth = (data) => setUser(data)
 
   return {
        user,
        setAuth
   }
 }