import React from 'react'
import { Navigate } from 'react-router-dom';

const Protection = ({children}) => {
   
        let data = localStorage.getItem('aut-token');
        if(data == null || !data || data === ""){
            return <Navigate to="/login"/>;
        }else{
            return children;
        }
    
  
}

export default Protection