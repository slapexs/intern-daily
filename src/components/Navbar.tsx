import { FC } from "react"
import { NavLink } from "react-router-dom"
import { links } from "../router"
const Navbar: FC = () => {
	const activeMenu = " bg-purple-500 text-white font-bold"
	const defaultMenu =
		"w-full flex justify-center flex-col gap-x-2 items-center py-2"
	return (
		<section className="w-full bg-neutral-100 fixed bottom-0 left-0 text-black text-xs">
			<ul className="flex justify-around">
				{links.map(
					(elem, index) =>
						elem.showInNavbar && (
							<NavLink
								to={elem.path}
								key={index}
								className={({ isActive }) =>
									isActive ? defaultMenu + activeMenu : defaultMenu
								}
							>
								{elem.icon}
								{elem.label}
							</NavLink>
						)
				)}
			</ul>
		</section>
	)
}

export default Navbar
