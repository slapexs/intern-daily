import { FC, useEffect } from "react"
import Navbar from "./components/Navbar"
import { useNavigate, NavigateFunction } from "react-router-dom"
import HighlightHeader from "./components/HighlightHeader"
import TopNavbar from "./components/TopNavbar"

const App: FC = () => {
	const navigate: NavigateFunction = useNavigate()

	useEffect(() => {
		const authToken: string | null = localStorage.getItem("auth-token")
		if (!authToken) {
			navigate("/login")
		}
	}, [])
	return (
		<main className="mb-20">
			<main className="w-full flex justify-center mt-10">
				<section className="w-10/12">
					<TopNavbar />
					{/* Main content */}
					<HighlightHeader />
				</section>
			</main>
			<Navbar />
		</main>
	)
}

export default App
