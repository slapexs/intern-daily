import { FC, useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import ListRecord from "../components/ListRecord"
import axios from "axios"

import ArrowUpDownLineIcon from "remixicon-react/ArrowUpDownLineIcon"

export type getRecordsProp = {
	recordId: string
	topic: string
	detail: string
	date: string
	imageName: string
}

const FindPage: FC = () => {
	const [getRecords, setGetRecords] = useState<getRecordsProp[]>([])
	const [searchDate, setSearchDate] = useState<string>("")
	const authToken = localStorage.getItem("auth-token")
	useEffect(() => {
		axios
			.post(
				"http://localhost:5000/record/all",
				{},
				{ headers: { Authorization: `Bearer ${authToken}` } }
			)
			.then((res) => {
				setGetRecords(res.data.records)
			})
	}, [])
	return (
		<section className="w-full flex justify-center mb-20">
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
						className="px-3 py-2 rounded bg-violet-500 text-white w-full"
						onClick={() => console.log(searchDate)}
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
							<ArrowUpDownLineIcon />
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
