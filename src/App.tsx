import { FC, useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { useNavigate, NavigateFunction } from "react-router-dom"
import HighlightHeader from "./components/HighlightHeader"
import TopNavbar from "./components/TopNavbar"
import axios from "axios"

const App: FC = () => {
	const [name, setName] = useState<string>("")
	const navigate: NavigateFunction = useNavigate()

	const authToken: string | null = localStorage.getItem("auth-token")
	useEffect(() => {
		axios
			.post(
				"http://localhost:5000/auth/user",
				{},
				{ headers: { Authorization: `Bearer ${authToken}` } }
			)
			.then((res) => setName(res.data.response.name))
		if (!authToken) {
			navigate("/login")
		}
	}, [])
	return (
		<main className="mb-20">
			<main className="w-full flex justify-center mt-10">
				<section className="w-10/12">
					<TopNavbar user={name} />
					{/* Main content */}
					<HighlightHeader />
				</section>
			</main>
			<Navbar />
		</main>
	)
}

export default App
