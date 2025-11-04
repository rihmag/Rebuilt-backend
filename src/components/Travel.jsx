import {useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const featured = {
	tags: ['POPULAR', 'TRAVEL'],
	title: 'Eiffel Tower Visit Paris City Tour',
	date: 'Jan 16, 2019',
	author: 'Theme Horse',
	img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
}

const lists = {
	Popular: [
		{
			tags: ['MAIN STORIES', 'TECH'],
			title: 'MacBook Pro for Business Man',
			date: 'Jan 19, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop',
		},
		{
			tags: ['FASHION', 'RECOMMENDED'],
			title: 'The Best Red Lipsticks of all Time',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1540553016723-8831f5b6c2d3?q=80&w=300&auto=format&fit=crop',
		},
		{
			tags: ['POPULAR', 'SPORTS'],
			title: 'Cars you Should Buy',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=300&auto=format&fit=crop',
		},
		{
			tags: ['SPORTS', 'TRENDING STORIES'],
			title: 'Tours with Ocean Sports',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=300&auto=format&fit=crop',
		},
	],
	Recent: [
		{
			tags: ['TRAVEL'],
			title: 'Best Nightlife Cities in the World',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=300&auto=format&fit=crop',
		},
		{
			tags: ['SPORTS', 'TRENDING STORIES'],
			title: 'Tours with Ocean Sports',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=300&auto=format&fit=crop',
		},
	],
	Commented: [
		{
			tags: ['TRAVEL'],
			title: 'Beautiful Cities in the World',
			date: 'Jan 7, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=300&auto=format&fit=crop',
		},
		{
			tags: ['HEALTH'],
			title: 'Best Classic Film Cameras',
			date: 'Jan 4, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=300&auto=format&fit=crop',
		},
	],
}

const Tag = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const SmallRow = ({item}) => (
	<div className='bg-white border border-gray-200 rounded p-3 flex gap-3 items-start card-hover'>
		<img
			src={item.img}
			alt={item.title}
			className='w-16 h-14 object-cover rounded'
		/>
		<div className='min-w-0'>
			<div className='flex gap-2'>
				<Tag>{item.tags[0]}</Tag>
				{item.tags[1] && <Tag color='bg-red-700'>{item.tags[1]}</Tag>}
			</div>
			<h4 className='text-sm font-semibold text-gray-900 mt-1 line-clamp-2'>
				{item.title}
			</h4>
			<p className='text-[11px] text-gray-500'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const Travel = () => {
	const [tab, setTab] = useState('Popular')
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='w-full px-0'>
				<div className='flex items-center justify-between mb-2 px-4 sm:px-0'>
					<h2 className='text-gray-800 font-semibold'>Travel – Style 3</h2>
					<div className='flex gap-2'>
						<button className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
							<ChevronLeft size={16} />
						</button>
						<button className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
							<ChevronRight size={16} />
						</button>
					</div>
				</div>

				<div className='bg-white border border-gray-200 rounded overflow-hidden mx-4 sm:mx-0 card-hover'>
					<div className='relative h-56'>
						<img
							src={featured.img}
							alt={featured.title}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-x-0 bottom-0 p-4'>
							<div className='flex gap-2 mb-1'>
								<Tag color='bg-red-600'>{featured.tags[0]}</Tag>
								<Tag color='bg-red-700'>{featured.tags[1]}</Tag>
							</div>
							<h3 className='text-white text-lg font-semibold drop-shadow'>
								{featured.title}
							</h3>
							<p className='text-xs text-gray-200'>
								{featured.date} / {featured.author}
							</p>
						</div>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
					</div>
				</div>

				<div className='mt-3 px-4 sm:px-0'>
					<div className='bg-gray-100 border border-gray-200 rounded'>
						<div className='flex items-center gap-2 p-2'>
							{Object.keys(lists).map((k) => (
								<button
									key={k}
									onClick={() => setTab(k)}
									className={`text-sm px-3 py-1.5 rounded ${
										tab === k
											? 'bg-white text-gray-900 border border-gray-200'
											: 'text-gray-700'
									}`}>
									{k}
								</button>
							))}
						</div>
						<div className='p-3 space-y-3'>
							{lists[tab].map((it, i) => (
								<SmallRow
									item={it}
									key={i}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Travel
