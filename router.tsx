import { createBrowserRouter } from "react-router-dom"
// Pages
import App from "./src/App"
import CratePage from "./src/pages/Create"
import FindPage from "./src/pages/Find"
import Login from "./src/pages/Login"
// Icons
import Home4LineIcon from "remixicon-react/Home4LineIcon"
import AddLineIcon from "remixicon-react/AddLineIcon"
import SearchLineIcon from "remixicon-react/SearchLineIcon"
import LogoutBoxRLineIcon from "remixicon-react/LogoutBoxRLineIcon"
import { RemixiconReactIconComponentType } from "remixicon-react"

type linkProps = {
	label: string
	path: string
	element?: JSX.Element
	icon?: RemixiconReactIconComponentType | any
	showInNavbar: boolean
	clickFunction?: () => void
}[]

export const links: linkProps = [
	{
		path: "/",
		label: "Home",
		element: <App />,
		icon: <Home4LineIcon />,
		showInNavbar: true,
	},
	{
		path: "/create",
		label: "Create",
		element: <CratePage />,
		icon: <AddLineIcon />,
		showInNavbar: true,
	},
	{
		path: "/find",
		label: "Find",
		element: <FindPage />,
		icon: <SearchLineIcon />,
		showInNavbar: true,
	},
	{
		path: "/login",
		label: "Login",
		element: <Login />,
		showInNavbar: false,
	},
	{
		path: "/login",
		label: "Logout",
		showInNavbar: true,
		icon: <LogoutBoxRLineIcon />,
		clickFunction: () => {
			localStorage.removeItem("auth-token")
		},
	},
]

export const router = createBrowserRouter(links)
