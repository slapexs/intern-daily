import { FC } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import TextareaField from "../components/TextareaField"
import FileInputField from "../components/FileInputField"

import TagHeader from "../components/TagHeader"

const CratePage: FC = () => {
	return (
		<section className="w-full flex justify-center">
			<TagHeader title="Create new | Intern-daily" />
			<div className="w-11/12 mt-10">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-3xl">Create new</h1>
					<p className="font-light text-gray-500 tracking-wider">
						เพิ่มบันทึกงานใหม่ ของวันนี้กันเลย!
					</p>
				</div>

				<div className="my-10">
					<form id="create-form" name="create-form">
						<InputFields id="date-input" label="วันที่" type="date" />
						<InputFields id="topic-input" label="หัวข้อ" type="text" />
						<TextareaField id="detail-input" label="รายละเอียด" />
						<FileInputField id="file-input" label="รูปภาพ" />
					</form>
				</div>
			</div>
			<Navbar />
		</section>
	)
}

export default CratePage
