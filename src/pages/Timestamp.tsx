import { FC, useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import axios from "axios"

type recentTimestamp = {
	recordId: string
	date: string
	enterTime: string
	leaveTime: string
}[]

const Timestamp: FC = () => {
	const [dateTimestamp, setDateTimestamp] = useState<string>("")
	const [enterTimestamp, setEnterTimestamp] = useState<string>("")
	const [leaveTimestamp, setLeaveTimestamp] = useState<string>("")
	const [listTimestamp, setListTimestamp] = useState<recentTimestamp>([])
	const [limitRecentTimestamp, setLimitRecentTimestamp] = useState<string>("10")

	// Function get recent timestamp
	const getRecentTimestamp = async (e: any = null) => {
		const authToken = localStorage.getItem("auth-token")
		const response = await axios.post(
			"http://localhost:5000/auth/user",
			{},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		)
		const { data } = await axios.get(
			`http://localhost:5000/timestamp/recent/${response.data.response.id}/${
				!e ? limitRecentTimestamp : e.target.value
			}`
		)
		setListTimestamp(data.data)
	}

	useEffect(() => {
		const currentDate = new Date()
		const isoDateString = currentDate.toISOString()
		const year = isoDateString.substring(0, 4)
		const month = isoDateString.substring(5, 7)
		const day = isoDateString.substring(8, 10)

		const formattedDate = `${year}-${month}-${day}`
		setDateTimestamp(formattedDate)

		// Get list timestamp
		getRecentTimestamp()
	}, [])

	const submitTimestamp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const token = localStorage.getItem("auth-token")

		const { data } = await axios.post(
			"http://localhost:5000/auth/user",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		try {
			const res = await axios.post("http://localhost:5000/timestamp/add", {
				date: dateTimestamp,
				enterTime: enterTimestamp,
				leaveTime: leaveTimestamp,
				uid: data.response.id,
			})
			alert(res.data.status)
			setEnterTimestamp("")
			setLeaveTimestamp("")
		} catch (error: any) {
			alert(error.response.data.status)
			setEnterTimestamp("")
			setLeaveTimestamp("")
		}
	}

	return (
		<section className="w-full flex justify-center">
			<div className="w-10/12 mt-10">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-3xl">Timestamp new</h1>
					<p className="font-light text-gray-500 tracking-wider">
						ลงเวลาทำงาน!
					</p>
				</div>
				<form onSubmit={submitTimestamp}>
					<div>
						<InputFields
							changeFunction={setDateTimestamp}
							id="timestamp_date"
							label="วันที่"
							type="date"
							required={true}
							value={dateTimestamp}
						/>
						<InputFields
							changeFunction={setEnterTimestamp}
							id="timestamp_time_enter"
							label="เวลาเข้า"
							type="time"
							required={true}
							value={enterTimestamp}
						/>
						<InputFields
							changeFunction={setLeaveTimestamp}
							id="timestamp_time_leave"
							label="เวลาออก"
							type="time"
							required={true}
							value={leaveTimestamp}
						/>
						<button
							type="submit"
							className="px-3 py-2 rounded bg-violet-500 text-white w-full"
						>
							บันทึก
						</button>
					</div>
				</form>
				{/* List timestamps */}
				<div className="my-10 pb-10">
					<div className="flex justify-between items-center">
						<div>
							<p className=" text-gray-400">บันทึกเวลา</p>
						</div>
						<div>
							<select
								name="recentLimit"
								id="recentLimit"
								onChange={(e) => getRecentTimestamp(e)}
							>
								<option value="10" disabled>
									จำนวนวัน
								</option>
								<option value="1">1</option>
								<option value="7">7</option>
								<option value="15">15</option>
								<option value="30">30</option>
							</select>
						</div>
					</div>
					<ul>
						{listTimestamp.map((elem, index) => (
							<li
								key={index}
								className="bg-white rounded outline outline-1 outline-gray-200 my-3 p-3"
							>
								<section className="flex justify-between items-center">
									<div>
										<h1 className="font-semibold text-lg text-violet-500">
											{elem.date}
										</h1>
									</div>
									<div className="flex justify-around text-sm text-gray-400">
										{elem.enterTime}
										{" - "}
										{elem.leaveTime}
									</div>
								</section>
							</li>
						))}
					</ul>
				</div>
			</div>
			<Navbar />
		</section>
	)
}

export default Timestamp
