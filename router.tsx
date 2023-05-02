import { createBrowserRouter } from "react-router-dom"
import App from "./src/App"
import CratePage from "./src/pages/Create"

import { HiOutlineHome, HiPlus, HiSearch } from "react-icons/Hi"
import FindPage from "./src/pages/find"

type linkProps = {
	label: string
	path: string
	element: JSX.Element | string
	icon: JSX.Element | string
}[]

export const links: linkProps = [
	{
		path: "/",
		label: "Home",
		element: <App />,
		icon: <HiOutlineHome />,
	},
	{
		path: "/create",
		label: "Create",
		element: <CratePage />,
		icon: <HiPlus />,
	},
	{
		path: "/find",
		label: "Find",
		element: <FindPage />,
		icon: <HiSearch />,
	},
]

export const router = createBrowserRouter(links)
