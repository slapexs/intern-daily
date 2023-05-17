import { FC } from "react"
import Navbar from "./components/Navbar"

import HighlightHeader from "./components/HighlightHeader"
import TopNavbar from "./components/TopNavbar"

const App: FC = () => {
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
