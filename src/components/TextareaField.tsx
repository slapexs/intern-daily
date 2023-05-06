import { FC } from "react"

type inputProps = {
	id: string
	label: string
}

const TextareaField: FC<inputProps> = ({ id, label }) => {
	return (
		<div className="my-5">
			<label htmlFor={id} className="font-light">
				{label}
			</label>
			<textarea
				rows={4}
				className="rounded-lg bg-zinc-50 outline outline-2 outline-gray-200 mt-1 w-full py-4 px-5 focus:outline-violet-300"
			/>
		</div>
	)
}

export default TextareaField
