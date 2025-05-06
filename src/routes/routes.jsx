import { useState } from "react"
import { createBrowserRouter } from "react-router-dom"
import Login from "../components/Login"
export let routes = [
	{
		path:'/',
		Element: <Login/>,
	}
]