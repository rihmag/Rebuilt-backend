import {useEffect, useRef, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const Tag = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const items = [
	{
		tags: ['FASHION', 'RECOMMENDED'],
		title: 'The Best Red Lipsticks of all Time',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=600&auto=format&fit=crop',
	},
	{
		tags: ['FASHION', 'RECOMMENDED'],
		title: 'Must Have Makeup Accessories',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=600&auto=format&fit=crop',
	},
	{
		tags: ['RECOMMENDED', 'TRAVEL'],
		title: 'Holiday Tour in Dubai',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1475738972911-5b44ce984c42?q=80&w=600&auto=format&fit=crop',
	},
	{
		tags: ['HEALTH', 'RECOMMENDED'],
		title: 'Popular Weight Loss Pills Reviewed',
		date: 'Jan 15, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1555279949-3701b0d9128c?q=80&w=600&auto=format&fit=crop',
	},
	{
		tags: ['MAIN STORIES', 'RECOMMENDED', 'TRAVEL'],
		title: 'Affordable Himalayan Tour Nepal',
		date: 'Jan 14, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=600&auto=format&fit=crop',
	},
]

const Card = ({item}) => (
	<div className='min-w-[260px] max-w-[260px] bg-white border border-gray-200 rounded overflow-hidden mr-4 card-hover'>
		<div className='relative h-36'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
			<div className='absolute left-3 bottom-3 flex gap-2'>
				{item.tags.slice(0, 3).map((t, i) => (
					<Tag
						key={i}
						color={
							i === 0 ? 'bg-red-600' : i === 1 ? 'bg-red-700' : 'bg-red-500'
						}>
						{t}
					</Tag>
				))}
			</div>
		</div>
		<div className='p-3'>
			<h3 className='text-sm font-semibold text-gray-900 leading-snug line-clamp-2'>
				{item.title}
			</h3>
			<p className='text-[11px] text-gray-500 mt-1'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const autoItem = {
	tags: ['RECOMMENDED', 'TECH'],
	title: 'The Best iPad Productivity Apps',
	date: 'Jan 14, 2019',
	author: 'Theme Horse',
	img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop',
}

const YouMissed = () => {
	const scrollerRef = useRef(null)
	const [index, setIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const [paused, setPaused] = useState(false)
	const [isVisible, setIsVisible] = useState(true)

	const data = [...items, autoItem]

	const onWheel = (e) => {
		const el = scrollerRef.current
		if (!el) return
		// If user scrolls vertically over the strip, move horizontally instead
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault()
			el.scrollBy({left: e.deltaY, behavior: 'smooth'})
		}
	}

	const scrollToIndex = (i) => {
		const el = scrollerRef.current
		if (!el) return
		const child = el.children[i % data.length]
		if (!child) return
		const targetLeft = child.offsetLeft // horizontal target only
		el.scrollTo({left: targetLeft, behavior: 'smooth'})
	}

	useEffect(() => {
		const intervalMs = 4000
		const tick = 50
		if (!isVisible || paused) return // only run when visible and not paused
		setProgress(0)
		const p = setInterval(
			() => setProgress((v) => Math.min(100, v + (100 * tick) / intervalMs)),
			tick
		)
		const t = setInterval(
			() => setIndex((i) => (i + 1) % data.length),
			intervalMs
		)
		return () => {
			clearInterval(p)
			clearInterval(t)
		}
	}, [data.length, paused, isVisible])

	useEffect(() => {
		scrollToIndex(index)
	}, [index])

	// Observe visibility to avoid forcing page to jump when user is elsewhere
	useEffect(() => {
		const el = scrollerRef.current
		if (!el) return
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]) setIsVisible(entries[0].isIntersecting)
			},
			{threshold: 0.3}
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const prev = () => {
		setIndex((i) => (i - 1 + data.length) % data.length)
		setProgress(0)
	}
	const next = () => {
		setIndex((i) => (i + 1) % data.length)
		setProgress(0)
	}

	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-center gap-3'>
						<h2 className='text-gray-800 font-semibold'>You may Missed</h2>
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

				<div
					ref={scrollerRef}
					className='flex overflow-x-auto pb-2 gap-0 hide-scroll scroll-smooth'
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					onWheel={onWheel}>
					{data.map((it, idx) => (
						<div key={`${idx}-${it.title}`}>
							<Card item={it} />
						</div>
					))}
				</div>
				<style>{`.hide-scroll::-webkit-scrollbar{display:none}`}</style>
			</div>
		</section>
	)
}

export default YouMissed
