import { FC, useEffect } from "react"
import Navbar from "./components/Navbar"
import { useNavigate } from "react-router-dom"
import TagHeader from "./components/TagHeader"
import HighlightHeader from "./components/HighlightHeader"
import TopNavbar from "./components/TopNavbar"

const App: FC = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const authToken = localStorage.getItem("auth-token")
		if (!authToken) {
			navigate("/login")
		}
	}, [])

	return (
		<main className="mb-20">
			<TagHeader title="Home | Intern-daily" />
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
