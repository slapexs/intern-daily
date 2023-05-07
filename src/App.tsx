import { FC, useEffect } from "react"
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

	return (
		<section>
			<Navbar />
		</section>
	)
}

export default App
