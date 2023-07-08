// Icons
import Home4LineIcon from "remixicon-react/Home4LineIcon"
import AddLineIcon from "remixicon-react/AddLineIcon"
import SearchLineIcon from "remixicon-react/SearchLineIcon"
import TimeLineIcon from "remixicon-react/TimeLineIcon"

import { RemixiconReactIconComponentType } from "remixicon-react"

type linkProps = {
	label: string
	path: string
	icon?: RemixiconReactIconComponentType | any
	showInNavbar: boolean
}[]

export const links: linkProps = [
	{
		path: "/",
		label: "Home",
		icon: <Home4LineIcon />,
		showInNavbar: true,
	},
	{
		path: "/create",
		label: "Create",
		icon: <AddLineIcon />,
		showInNavbar: true,
	},
	{
		path: "/timestamp",
		label: "Timestamp",
		icon: <TimeLineIcon />,
		showInNavbar: false,
	},
	{
		path: "/find",
		label: "Find",
		icon: <SearchLineIcon />,
		showInNavbar: true,
	},
	{
		path: "/login",
		label: "Login",
		showInNavbar: false,
	},
]
