import { FC, useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import ListRecord from "../components/ListRecord"
import axios from "axios"

import CloseLineIcon from "remixicon-react/CloseLineIcon"

// Toast
import toast, { Toaster } from "react-hot-toast"

export type getRecordsProp = {
	recordId: string
	topic: string
	detail: string
	date: string
	imageName: string
}

// const toastPromise = (promiseFunction: any) => {

// }

const FindPage: FC = () => {
	const [getRecords, setGetRecords] = useState<getRecordsProp[]>([])
	const [searchDate, setSearchDate] = useState<string>("")
	const [canClear, setCanClear] = useState<boolean>(false)
	const authToken = localStorage.getItem("auth-token")

	const GetMyRecord = async () => {
		setCanClear(false)
		axios
			.post(
				"http://localhost:5000/record/all",
				{},
				{ headers: { Authorization: `Bearer ${authToken}` } }
			)
			.then((res) => {
				setGetRecords(res.data.records)
			})
	}
	useEffect(() => {
		GetMyRecord()
	}, [])

	// Search record by date
	const SearchRecordByDate = async () => {
		if (!searchDate) {
			toast.error("กรุณาระบุวันที่", {
				duration: 2000,
			})
			return
		}

		const response = axios.post(
			"http://localhost:5000/record/searchbydate",
			{ date: searchDate },
			{ headers: { Authorization: `Bearer ${authToken}` } }
		)
		toast
			.promise(response, {
				loading: "กำลังค้นหาข้อมูล",
				success: "เรียบร้อย",
				error: (response) =>
					`ผิดพลาด! ไม่สามารถค้นหาข้อมูลได้ \n Status : ${response.message}`,
			})
			.then((res) => {
				if (res.status == 200) {
					setCanClear(true)
					setGetRecords(res.data.data)
				} else if (res.status == 204) {
					toast("ไม่พบบันทึกที่ตรงกับวันที่นี้", { icon: "📭" })
				}
			})
	}

	return (
		<section className="w-full flex justify-center mb-20">
			{/* Taost alert */}
			<Toaster />

			<div className="w-10/12 mt-10">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-3xl">Find record</h1>
					<p className="font-light text-gray-500 tracking-wider">
						ค้นหาบันทึกเก่า ของคุณได้เลย!
					</p>
				</div>

				<div className="my-10">
					<InputFields
						required={false}
						changeFunction={setSearchDate}
						id="search-input"
						label="ค้นหาด้วยวันที่"
						type="date"
					/>
					<button
						type="button"
						className={`px-3 py-2 rounded  text-white w-full ${
							searchDate != "" ? "bg-violet-500" : "bg-violet-200"
						}`}
						onClick={SearchRecordByDate}
					>
						ค้นหา
					</button>
				</div>

				<div className="my-10">
					<div className="flex justify-between">
						<div>
							<p className=" text-gray-400">ล่าสุด</p>
						</div>

						<div>
							{canClear && (
								<CloseLineIcon
									className="bg-violet-100 items-center rounded-lg flex text-sm"
									onClick={GetMyRecord}
								/>
							)}
						</div>
					</div>

					{getRecords.map((elem, index) => (
						<ListRecord
							date={elem.date}
							title={elem.topic}
							recordId={elem.recordId}
							key={index}
						/>
					))}
				</div>
			</div>
			<Navbar />
		</section>
	)
}

export default FindPage
