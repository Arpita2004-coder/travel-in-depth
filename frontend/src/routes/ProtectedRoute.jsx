import React from "react"
import { Navigate } from "react-router-dom";


const ProtectedRoute=({children})=>{
    const isAdminLoggedin=localStorage.getItem("isAdminLoggedin")=="true";

    if(!isAdminLoggedin){
        return <Navigate to='/admin/login' replace/>
    }
    return children;
}

export default ProtectedRoute;