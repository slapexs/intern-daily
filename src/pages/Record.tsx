import { FC, useEffect, useState } from "react"
import { useParams, Params } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import CalendarLineIcon from "remixicon-react/CalendarLineIcon"
import TimeLineIcon from "remixicon-react/TimeLineIcon"
import "../index.css"

type recordProps = {
	recordId: string
	topic: string
	detail: string
	date: string
	imageName: string
}

const Record: FC = () => {
	const [findRecord, setFindRecord] = useState<recordProps>()
	const [images, setImages] = useState<string[]>([])
	const [timestamp, setTimestamp] = useState<string>("")

	const { recordId }: Readonly<Params<string>> = useParams()
	const getTimestamp = async (date: string) => {
		const res = await axios.get(
			`http://localhost:5000/timestamp/findone/${date}`
		)
		if (res.data.data) {
			setTimestamp(`${res.data.data.enterTime} - ${res.data.data.leaveTime}`)
		}
	}
	useEffect(() => {
		axios.get(`http://localhost:5000/record/find/${recordId}`).then((res) => {
			const response = res.data.data
			setFindRecord(response)
			setImages(response.imageName.split(","))
			getTimestamp(response.date)
		})
	}, [])

	return (
		<section className="w-full flex justify-center mb-20">
			<div className="w-10/12 mt-10 ">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-2xl text-violet-600">
						{findRecord?.topic}
					</h1>
				</div>
				<div className="flex gap-x-2 text-sm mt-5 text-gray-500">
					<CalendarLineIcon /> {findRecord?.date}
				</div>

				<div className="flex gap-x-2 text-sm text-gray-500">
					<TimeLineIcon /> {timestamp ? timestamp : "-"}
				</div>

				{/* detail */}
				<div className="mt-10">
					<p className="text-gray-500">รายละเอียด</p>
					<p className="text-justify">{findRecord?.detail}</p>
				</div>

				{/* Image */}
				<div className="mt-10 flex justify-center flex-col">
					<p className="text-gray-500">รูปภาพ</p>
					{/* Display image here */}
					{images.map((elem, index) => (
						<img
							key={index}
							src={
								elem
									? `http://localhost:5000/image/${elem}`
									: "https://placehold.co/600x600?font=roboto&text=Image+Not+Uploaded"
							}
							alt={`image-${elem}`}
							className="my-2 rounded"
						/>
					))}
				</div>
			</div>

			<Navbar />
		</section>
	)
}

export default Record
