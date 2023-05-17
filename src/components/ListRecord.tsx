import { FC } from "react"
import CalendarLineIcon from "remixicon-react/CalendarLineIcon"
import StartLineIcon from "remixicon-react/StarLineIcon"
type listProps = {
	title: number
}

const ListRecord: FC<listProps> = ({ title }) => {
	return (
		<div className="w-full flex justify-between my-3 rounded-lg bg-white outline outline-1 outline-gray-200 px-3 py-4 shadow-sm">
			<div className="space-y-1">
				<h1 className="font-bold text-violet-600">
					#{title + 1} Lorem, ipsum dolor.
				</h1>
				<p className="text-xs font-light text-gray-400 flex items-center gap-x-2">
					<CalendarLineIcon />
					06/05/2023
				</p>
			</div>

			<div>
				<p className="w-fit h-fit">
					<StartLineIcon className="text-gray-400" />
				</p>
			</div>
		</div>
	)
}

export default ListRecord
