import {useEffect, useMemo, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const sports = [
	{
		tags: ['POPULAR', 'SPORTS'],
		title: 'Common GYM Mistakes to Avoid',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
		img: '../images/img-2.jpg',
	},
	{
		tags: ['SPORTS'],
		title: 'Inside the wonderful world of cycle racing',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
		img: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop',
	},
	{
		tags: ['SPORTS'],
		title: 'FIFA World Cup top Goal Scorers',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
		img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1600&auto=format&fit=crop',
	},
]

const Pill = ({text, color = 'bg-red-600'}) => (
	<span
		className={`text-[10px] font-semibold text-white px-2 py-1 rounded ${color}`}>
		{text}
	</span>
)

const FeatureCard = ({item, fadeKey}) => (
	<div
		key={fadeKey}
		className='bg-white border border-gray-200 rounded overflow-hidden transition-opacity duration-500 ease-in-out opacity-100 card-hover'>
		<div className='relative h-44 md:h-56'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
			<div className='absolute left-3 bottom-3 flex gap-2'>
				{/* Render one or two tags */}
				<Pill text={(item.tags && item.tags[0]) || 'SPORTS'} />
				{item.tags && item.tags[1] && (
					<Pill
						text={item.tags[1]}
						color='bg-red-700'
					/>
				)}
			</div>
		</div>
		<div className='p-4'>
			<h3 className='text-xl font-semibold text-gray-900 leading-snug'>
				{item.title}
			</h3>
			<p className='text-xs text-gray-500 mt-1'>
				{item.date} / {item.author}
			</p>
			<p className='text-[13px] text-gray-700 mt-2 leading-relaxed'>
				{item.excerpt}
			</p>
		</div>
	</div>
)

const useAutoAdvance = (length, step = 1, intervalMs = 4500) => {
	const [index, setIndex] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const tick = 50
		setProgress(0)

		const progressTimer = setInterval(() => {
			setProgress((p) => Math.min(100, p + (100 * tick) / intervalMs))
		}, tick)

		const advanceTimer = setInterval(() => {
			setIndex((i) => (i + step + length) % length)
			setProgress(0)
		}, intervalMs)

		return () => {
			clearInterval(progressTimer)
			clearInterval(advanceTimer)
		}
	}, [length, step, intervalMs])

	const next = () => {
		setIndex((i) => (i + step + length) % length)
		setProgress(0)
	}
	const prev = () => {
		setIndex((i) => (i - step + length) % length)
		setProgress(0)
	}

	return {index, next, prev, progress}
}

const Sports = () => {
	const visibleCount = 2 // show two cards side-by-side
	const {index, next, prev, progress} = useAutoAdvance(sports.length, 1, 4500)

	const visibleItems = useMemo(() => {
		const arr = []
		for (let k = 0; k < visibleCount; k++) {
			arr.push(sports[(index + k) % sports.length])
		}
		return arr
	}, [index])

	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-center gap-3'>
						<h2 className='text-gray-800 font-semibold'>Sports</h2>
						<div className='hidden sm:block w-32 h-1 bg-gray-200 rounded overflow-hidden'>
							<div
								className='h-full bg-red-600 transition-all'
								style={{width: `${progress}%`}}
							/>
						</div>
					</div>
					<div className='flex gap-2'>
						<button
							onClick={prev}
							className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
							<ChevronLeft size={16} />
						</button>
						<button
							onClick={next}
							className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
							<ChevronRight size={16} />
						</button>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{visibleItems.map((s, i) => (
						<FeatureCard
							key={`${index}-${i}-${s.title}`}
							fadeKey={`${index}-${i}`}
							item={s}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default Sports
