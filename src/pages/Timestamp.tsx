import { FC, useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import axios from "axios"

interface formatDate {
	day: number
	month: number
	fullYear: number
}

const Timestamp: FC = () => {
	const [dateTimestamp, setDateTimestamp] = useState<string>("")
	const [enterTimestamp, setEnterTimestamp] = useState<string>("")
	const [leaveTimestamp, setLeaveTimestamp] = useState<string>("")

	useEffect(() => {
		const currentDate = new Date()
		const isoDateString = currentDate.toISOString()
		const year = isoDateString.substring(0, 4)
		const month = isoDateString.substring(5, 7)
		const day = isoDateString.substring(8, 10)

		const formattedDate = `${year}-${month}-${day}`
		setDateTimestamp(formattedDate)
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
		} catch (error) {
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
			</div>
			<Navbar />
		</section>
	)
}

export default Timestamp
