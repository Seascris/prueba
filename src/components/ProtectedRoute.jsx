import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({protect}){
    const location = useLocation();
    const userString = localStorage.getItem("user");
    
    if (!userString) {
        return <Navigate to="/" />;
    }
    
    const user = JSON.parse(userString);
    const isAdminRoute = location.pathname === "/admin";
    
    // Si es ruta de admin pero el usuario no es admin, redirigir a home
    if (isAdminRoute && user.role !== "admin") {
        return <Navigate to="/home" />;
    }
    
    // Si es ruta de visitante pero el usuario es admin, redirigir a admin
    if (!isAdminRoute && user.role === "admin") {
        return <Navigate to="/admin" />;
    }
    
    return protect;
}

export default ProtectedRoute;