import { FC } from "react"
import Navbar from "../components/Navbar"
import InputFields from "../components/InputField"
import ListRecord from "../components/ListRecord"

import ArrowUpDownLineIcon from "remixicon-react/ArrowUpDownLineIcon"

const FindPage: FC = () => {
	const listElem = []
	for (let index = 0; index < 15; index++) {
		listElem.push(<ListRecord title={index} />)
	}
	return (
		<section className="w-full flex justify-center">
			<div className="w-11/12 mt-10">
				<div className="mb-5 space-y-2">
					<h1 className="font-bold text-3xl">Find record</h1>
					<p className="font-light text-gray-500 tracking-wider">
						ค้นหาบันทึกเก่า ของคุณได้เลย!
					</p>
				</div>

				<div className="my-10">
					<InputFields id="search-input" label="ค้นหา" type="text" />
				</div>

				<div className="my-10">
					<div className="flex justify-between">
						<div>
							<p className=" text-gray-400">ล่าสุด</p>
						</div>

						<div>
							<ArrowUpDownLineIcon />
						</div>
					</div>

					{listElem.map((elem, index) => (
						<div key={index}>{elem}</div>
					))}
				</div>
			</div>
			<Navbar />
		</section>
	)
}

export default FindPage
