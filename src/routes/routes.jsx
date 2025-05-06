import Login from "../pages/Login"
import Home from "../pages/Home"
import AdminPanel from "../pages/AdminPanel"
import ProtectedRoute from "../components/ProtectedRoute"

export let routes = [
	{
		path: "/",
		element: <Login/>,
	},
	{
		path: "Home",
		element: <ProtectedRoute protect={<Home/>} />,
	},
	{
		path: "admin",
		element: <ProtectedRoute protect={<AdminPanel/>} />,
	}
]




