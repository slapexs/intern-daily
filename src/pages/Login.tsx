import { FC, useState } from "react"

const Login: FC = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	return (
		<section className="flex flex-col w-full justify-center items-center h-screen">
			<div className="w-9/12">
				{/* Form login */}
				<div className="w-full">
					<h1 className="font-bold text-2xl">Hey! intern</h1>
					<h1 className="font-bold text-2xl">Please login</h1>
				</div>

				<div
					id="section-login"
					aria-label="section-login"
					className="mt-10 w-full"
				>
					<form action="#" id="form-login" method="post" className="space-y-3">
						<input
							id="username-input"
							name="username-input"
							type="text"
							className="rounded-lg bg-zinc-100 w-full py-4 px-5 focus:outline-violet-300"
							placeholder="Username"
							autoComplete="off"
							aria-label="username-input"
							onChange={(e) => setUsername(e.target.value)}
							required={true}
						/>
						<input
							id="password-input"
							name="password-input"
							type="password"
							className="rounded-lg bg-zinc-100 w-full py-4 px-5 focus:outline-violet-300"
							placeholder="Password"
							aria-label="password-input"
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>

						<div className="">
							<button
								type="submit"
								id="btn-login"
								name="btn-login"
								className="bg-violet-400 rounded-lg w-full py-3 text-white mt-5"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Login
