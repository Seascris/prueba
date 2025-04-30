import { Navigate } from "react-router-dom"

function ProtectedRoute({protect}){
    let accessToken = localStorage.getItem("token")
    return accessToken ? protect : <Navigate to = "/" />
}
export default ProtectedRoute