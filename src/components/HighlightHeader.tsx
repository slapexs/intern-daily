import { useState, useEffect, FC } from "react"
import ListRecord from "./ListRecord"
import Gallery from "./Gallery"

const demoRecord = [1, 2, 3]
const imageGallery = [
	"https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	"https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
]
const HighlightHeader: FC = () => {
	const [passedDay, setPassedDay] = useState<number>(0)
	const [leftDay, setLeftDay] = useState<number>(120)

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
				{demoRecord.map((elem, index) => (
					<ListRecord title={elem} key={index} />
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
