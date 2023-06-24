import { FC, useState } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import TextareaField from "../components/TextareaField"
import FileInputField from "../components/FileInputField"
import axios from "axios"
import { NavigateFunction, useNavigate } from "react-router-dom"

const CratePage: FC = () => {
	const [topic, setTopic] = useState<string>("")
	const [detail, setDetail] = useState<string>("")
	const [date, setDate] = useState<string>("")
	const [imageName, setImageName] = useState<string[]>([])

	const navigate: NavigateFunction = useNavigate()

	const submitForm = async (e: any) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append("topic", topic)
		formData.append("detail", detail)
		formData.append("date", date)
		for (let i = 0; i < imageName.length; i++) {
			formData.append("file", imageName[i])
		}
		const token = localStorage.getItem("auth-token")
		axios
			.post("http://localhost:5000/record/create", formData, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				alert(res.data.status)
				navigate("/find")
			})
	}
	return (
		<section className="w-full flex justify-center">
			<div className="w-10/12 mt-10">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-3xl">Create new</h1>
					<p className="font-light text-gray-500 tracking-wider">
						เพิ่มบันทึกงานใหม่ ของวันนี้กันเลย!
					</p>
				</div>

				<div className="my-10">
					<form
						id="create-form"
						name="create-form"
						encType="multipath/form-data"
						onSubmit={submitForm}
					>
						<InputFields
							id="date-input"
							label="วันที่"
							type="date"
							changeFunction={setDate}
							required={true}
						/>
						<InputFields
							id="topic-input"
							label="หัวข้อ"
							type="text"
							changeFunction={setTopic}
							required={true}
						/>
						<TextareaField
							id="detail-input"
							label="รายละเอียด"
							changeFunction={setDetail}
							required={true}
						/>
						<FileInputField
							id="file-input"
							label="รูปภาพ"
							isMultipleFiles={true}
							name="record-images"
							required={false}
							changeFunction={setImageName}
						/>
						<button
							type="submit"
							className="px-3 py-2 rounded bg-violet-500 text-white w-full"
						>
							บันทึก
						</button>
					</form>
				</div>
			</div>
			<Navbar />
		</section>
	)
}

export default CratePage
