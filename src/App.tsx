import { FC, useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { useNavigate } from "react-router-dom"

const App: FC = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const authToken = localStorage.getItem("auth-token")
		if (!authToken) {
			navigate("/login")
		}
	}, [])
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
