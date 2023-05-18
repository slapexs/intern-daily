import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import App from "./App.tsx"
import CratePage from "./pages/Create.tsx"
import FindPage from "./pages/Find.tsx"
import Login from "./pages/Login.tsx"
import Record from "./pages/Record.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<React.StrictMode>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/create" element={<CratePage />} />
				<Route path="/find" element={<FindPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/record">
					<Route path=":recordId" element={<Record />} />
				</Route>
			</Routes>
		</React.StrictMode>
	</BrowserRouter>
)
