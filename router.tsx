import { createBrowserRouter } from "react-router-dom"
import App from "./src/App"
import CratePage from "./src/pages/Create"

import { HiOutlineHome, HiPlus, HiSearch } from "react-icons/Hi"
import FindPage from "./src/pages/find"
import Login from "./src/pages/Login"

type linkProps = {
	label: string
	path: string
	element: JSX.Element | string
	icon?: JSX.Element | string
	showInNavbar: boolean
}[]

export const links: linkProps = [
	{
		path: "/",
		label: "Home",
		element: <App />,
		icon: <HiOutlineHome />,
		showInNavbar: true,
	},
	{
		path: "/create",
		label: "Create",
		element: <CratePage />,
		icon: <HiPlus />,
		showInNavbar: true,
	},
	{
		path: "/find",
		label: "Find",
		element: <FindPage />,
		icon: <HiSearch />,
		showInNavbar: true,
	},
	{
		path: "/login",
		label: "Login",
		element: <Login />,
		showInNavbar: false,
	},
]

export const router = createBrowserRouter(links)
