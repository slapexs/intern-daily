import { FC } from "react"
import { links } from "../../router"
import { NavLink } from "react-router-dom"

const Navbar: FC = () => {
	const defaultLink =
		"p-2 w-full hover:bg-violet-500 hover:text-white hover:cursor-pointer"
	const pending =
		"p-2 w-full hover:bg-violet-600 hover:text-white hover:cursor-pointer"
	const active = "bg-violet-600 text-white cursor-pointer w-full p-2"
	return (
		<section className="w-full bg-zinc-100 absolute bottom-0">
			<ul className="flex justify-around">
				{links.map(
					(elem, index) =>
						elem.showInNavbar && (
							<NavLink
								key={index}
								to={elem.path}
								className={({ isActive, isPending }) =>
									isPending ? pending : isActive ? active : defaultLink
								}
								onClick={elem.clickFunction && elem.clickFunction}
							>
								<li className="flex flex-col items-center">
									{elem.icon}
									<span className="text-xs">{elem.label}</span>
								</li>
							</NavLink>
						)
				)}
			</ul>
		</section>
	)
}

export default Navbar
