import { FC, useEffect, useState } from "react"
import { useParams, Params } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import CalendarLineIcon from "remixicon-react/CalendarLineIcon"
import "../index.css"

type recordProps = {
	recordId: string
	topic: string
	detail: string
	date: string
	imageName: string
}

const imageGallery = [
	"https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	"https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
]

const Record: FC = () => {
	const [findRecord, setFindRecord] = useState<recordProps>()

	const { recordId }: Readonly<Params<string>> = useParams()
	useEffect(() => {
		axios
			.get(`http://localhost:5000/record/find/${recordId}`)
			.then((res) => setFindRecord(res.data.data))
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

				{/* detail */}
				<div className="mt-10">
					<p className="text-gray-500">รายละเอียด</p>
					<p className="text-justify">{findRecord?.detail}</p>
				</div>

				{/* Image */}
				<div className="mt-10">
					<p className="text-gray-500">รูปภาพ</p>
					{imageGallery.map((elem, index) => (
						<img src={elem} key={index} className="mb-2 large-gallery-image" />
					))}
				</div>
			</div>

			<Navbar />
		</section>
	)
}

export default Record
