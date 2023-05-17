import iconProfile from "../assets/icons8-stan-marsh-48.png"
import { FC, useState } from "react"
import LogoutBoxRLineIcon from "remixicon-react/LogoutBoxRLineIcon"
import { useNavigate } from "react-router-dom"

const TopNavbar: FC = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState<string>("Mai bok na")
	return (
		<section className="w-full flex justify-between items-center mb-5">
			<div id="avatar" className="flex items-center space-x-2">
				<img
					src={iconProfile}
					className="bg-purple-200 rounded-full p-2"
					width={48}
					height={48}
				/>
				<div className="-space-y-2">
					<span className="font-light text-sm text-gray-400">Hello</span>
					<h1 className="font-semibold">{user}</h1>
				</div>
			</div>

			<div id="logoutBtn">
				<LogoutBoxRLineIcon
					className="text-purple-400"
					onClick={() => {
						localStorage.removeItem("auth-token")
						navigate("/login")
					}}
				/>
			</div>
		</section>
	)
}

export default TopNavbar
