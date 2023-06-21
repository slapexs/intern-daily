import { useState, useEffect, FC } from "react"
import ListRecord from "./ListRecord"
import Gallery from "./Gallery"
import { getRecordsProp } from "../pages/Find"
import axios from "axios"

const imageGallery = [
	"https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	"https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
]

const HighlightHeader: FC = () => {
	const [passedDay, setPassedDay] = useState<number>(0)
	const [leftDay, setLeftDay] = useState<number>(0)
	const [getRecords, setGetRecords] = useState<getRecordsProp[]>([])

	useEffect(() => {
		axios.get("http://localhost:5000/record/all").then((res) => {
			setGetRecords(res.data.records)
		})
		// Date calculate
		const currentDate = new Date()
		const desiredDate = new Date("2023-09-31")
		const startDate = new Date("2023-05-31")
		const startDiffDate = Math.floor(
			(currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
		)
		const diffInDays = Math.floor(
			(desiredDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
		)
		setLeftDay(diffInDays)
		setPassedDay(startDiffDate)
	}, [])

	return (
		<main>
			<div className="bg-gradient-to-r from-violet-600 to-purple-500 rounded-lg shadow-md p-4 flex justify-around text-center items-center">
				<div>
					<h1 className="text-zinc-300 font-light">ฝึกงานมาแล้ว</h1>
					<h1 className="text-zinc-50 font-bold text-2xl">{passedDay} วัน</h1>
				</div>

				<div>
					<h1 className="text-zinc-300 font-light">เหลืออีก</h1>
					<h1 className="text-zinc-50 font-bold text-2xl">{leftDay} วัน</h1>
				</div>
			</div>

			<div className="mt-5">
				<h1>บันทึกล่าสุด</h1>
				{getRecords.map((elem, index) => (
					<ListRecord
						title={elem.topic}
						date={elem.date}
						recordId={elem.recordId}
						key={index}
					/>
				))}
			</div>

			<div className="mt-5">
				<h1 className="mb-2">รูปภาพ</h1>
				<Gallery image={imageGallery} />
			</div>
		</main>
	)
}

export default HighlightHeader
