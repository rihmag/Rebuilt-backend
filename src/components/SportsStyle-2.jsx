import {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const items = [
	{
		tags: ['POPULAR', 'SPORTS'],
		title: 'Common GYM Mistakes to Avoid',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: '../images/img-2.jpg',
	},
	{
		tags: ['SPORTS'],
		title: 'Inside the wonderful world of cycle racing',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop',
	},
	{
		tags: ['SPORTS'],
		title: 'FIFA World Cup top Goal Scorers',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1600&auto=format&fit=crop',
	},
]

const Pill = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const useAuto = (length, intervalMs = 4500) => {
	const [idx, setIdx] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const tick = 50
		setProgress(0)
		const p = setInterval(
			() => setProgress((v) => Math.min(100, v + (100 * tick) / intervalMs)),
			tick
		)
		const t = setInterval(() => {
			setIdx((i) => (i + 1) % length)
			setProgress(0)
		}, intervalMs)
		return () => {
			clearInterval(p)
			clearInterval(t)
		}
	}, [length, intervalMs])

	const next = () => {
		setIdx((i) => (i + 1) % length)
		setProgress(0)
	}
	const prev = () => {
		setIdx((i) => (i - 1 + length) % length)
		setProgress(0)
	}
	return {idx, next, prev, progress}
}

const SportsStyle2 = () => {
	const {idx, next, prev, progress} = useAuto(items.length, 4500)
	const it = items[idx]

	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<h2 className='text-gray-800 font-semibold'>Sports – Style 2</h2>
					<div className='flex items-center gap-3'>
						<div className='hidden sm:block w-32 h-1 bg-gray-200 rounded overflow-hidden'>
							<div
								className='h-full bg-red-600 transition-all'
								style={{width: `${progress}%`}}
							/>
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
				</div>

				<div className='bg-white border border-gray-200 rounded overflow-hidden card-hover'>
					<div className='relative h-72 md:h-96'>
						<img
							src={it.img}
							alt={it.title}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent' />
						<div className='absolute left-4 bottom-4 right-4 text-white'>
							<div className='flex gap-2 mb-2'>
								<Pill color='bg-red-600'>{it.tags[0]}</Pill>
								{it.tags[1] && <Pill color='bg-red-700'>{it.tags[1]}</Pill>}
							</div>
							<h3 className='text-2xl md:text-3xl font-bold leading-tight drop-shadow'>
								{it.title}
							</h3>
							<p className='text-xs text-gray-200 mt-1'>
								{it.date} / {it.author}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SportsStyle2
