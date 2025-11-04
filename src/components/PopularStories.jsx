import {useEffect, useMemo, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const items = [
	{
		tags: ['POPULAR', 'TRAVEL'],
		title: 'Eiffel Tower Visit Paris City Tour',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
	},
	{
		tags: ['POPULAR', 'TECH'],
		title: 'Best Microsoft Surface Laptop',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop',
	},
	{
		tags: ['POPULAR', 'TECH'],
		title: 'Apple will launch a three camera',
		date: 'Jan 15, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
	},
	{
		tags: ['POPULAR', 'SPORTS'],
		title: 'Common GYM Mistakes to Avoid',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1517963628607-235ccdd5476e?q=80&w=1200&auto=format&fit=crop',
	},
	{
		tags: ['POPULAR', 'SPORTS'],
		title: 'Cars you Should Buy',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1200&auto=format&fit=crop',
	},
]

const Tag = ({children, color}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const Card = ({item}) => (
	<div className='bg-white rounded shadow-sm overflow-hidden border border-gray-100 card-hover'>
		<div className='relative h-40'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
			<div className='absolute inset-x-0 bottom-0 p-3 flex gap-2'>
				<Tag color='bg-red-600'>{item.tags[0]}</Tag>
				<Tag color='bg-red-700'>{item.tags[1]}</Tag>
			</div>
		</div>
		<div className='p-3'>
			<h3 className='text-gray-800 font-semibold leading-snug line-clamp-2'>
				{item.title}
			</h3>
			<p className='text-xs text-gray-500 mt-1'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const useAutoAdvance = (length, step = 1, intervalMs = 4000) => {
	const [index, setIndex] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const tick = 50 // ms
		setProgress(0)

		const progressTimer = setInterval(() => {
			setProgress((p) => {
				const next = p + (100 * tick) / intervalMs
				return next >= 100 ? 100 : next
			})
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

const PopularStories = () => {
	const visibleCount = 4 // how many cards shown at once on large screens
	const {index, next, prev, progress} = useAutoAdvance(items.length, 1, 4000)

	const visibleItems = useMemo(() => {
		const arr = []
		for (let k = 0; k < visibleCount; k++) {
			arr.push(items[(index + k) % items.length])
		}
		return arr
	}, [index])

	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-center gap-3'>
						<h2 className='text-gray-800 font-semibold'>Popular Stories</h2>
						{/* timeline/progress bar */}
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

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{visibleItems.map((it, idx) => (
						<Card
							key={`${index}-${idx}-${it.title}`}
							item={it}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default PopularStories
