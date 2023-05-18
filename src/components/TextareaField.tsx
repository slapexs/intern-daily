import { FC } from "react"

type inputProps = {
	id: string
	label: string
	changeFunction: (s: string) => void
	required: boolean
}

const TextareaField: FC<inputProps> = ({
	id,
	label,
	changeFunction,
	required,
}) => {
	return (
		<div className="my-5">
			<label htmlFor={id} className="font-light">
				{label}
			</label>
			<textarea
				rows={4}
				className="rounded-lg bg-zinc-50 outline outline-2 outline-gray-200 mt-1 w-full py-4 px-5 focus:outline-violet-300"
				onChange={(e) => changeFunction(e.target.value)}
				required={required}
			/>
		</div>
	)
}

export default TextareaField
