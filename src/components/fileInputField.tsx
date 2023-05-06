import { FC } from "react"

type inputProps = {
	id: string
	label: string
}

const FileInputField: FC<inputProps> = ({ id, label }) => {
	return (
		<div className="my-5">
			<label htmlFor={id} className="font-light">
				{label}
			</label>
			<input type="file" id={id} name={id} className="w-full mt-1" />

			<canvas className="w-full"></canvas>
		</div>
	)
}

export default FileInputField
