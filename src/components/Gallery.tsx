import { FC } from "react"
import "../index.css"

interface imagesProps {
	image: string[]
}

const Gallery: FC<imagesProps> = ({ image }) => {
	return (
		<main className="w-full grid grid-cols-3 gap-2">
			{image.map((elem, index) => (
				<div key={index}>
					<img src={elem} alt="" className="rounded-md gallery-image " />
				</div>
			))}
		</main>
	)
}

export default Gallery
