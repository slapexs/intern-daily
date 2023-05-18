import { FC } from "react"

type inputProps = {
	id: string
	label: string
	isMultipleFiles: boolean
	name: string
	required: boolean
	changeFunction: (s: string[]) => void
}

const FileInputField: FC<inputProps> = ({
	id,
	label,
	isMultipleFiles,
	name,
	required,
	changeFunction,
}) => {
	return (
		<div className="my-5">
			<label htmlFor={id} className="font-light">
				{label}
			</label>
			<input
				type="file"
				id={id}
				name={name}
				className="w-full mt-1"
				multiple={isMultipleFiles}
				required={required}
				onChange={(e: any) => changeFunction([...e.target.files])}
			/>
		</div>
	)
}

export default FileInputField
