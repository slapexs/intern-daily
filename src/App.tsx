import { FC, useEffect, useState } from "react"
import Navbar from "./components/Navbar"

const App: FC = () => {
	const defaultTheme = localStorage.getItem("theme")

	const setDarkmode = () => {
		localStorage.setItem("theme", "dark")
		document.querySelector("body")?.setAttribute("data-theme", "dark")
	}
	const setLightmode = () => {
		localStorage.setItem("theme", "light")
		document.querySelector("body")?.setAttribute("data-theme", "light")
	}

	const changeTheme = (e: { target: { checked: any } }) => {
		e.target.checked ? setDarkmode() : setLightmode()
	}

	if (defaultTheme == "dark") {
		setDarkmode()
	}

	return (
		<section>
			<Navbar />
		</section>
	)
}

export default App
