import {ChevronLeft, ChevronRight} from 'lucide-react'

const pills = [
	{
		text: 'Top Stories',
		indicator: true,
	},
	{
		text: 'Best Nightlife Cities in the World',
		img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=200&auto=format&fit=crop',
	},
	{
		text: 'Eiffel Tower Visit Paris City Tour',
		img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=200&auto=format&fit=crop',
	},
	{
		text: 'Holiday Tour in Dubai',
		img: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=200&auto=format&fit=crop',
	},
	{
		text: 'Beautiful Cities in the World',
		img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=200&auto=format&fit=crop',
	},
	{
		text: 'MacBook Pro for Business Man',
		img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop',
	},
]

const data = {
	main: {
		tag1: 'MAIN STORIES',
		tag2: 'TRAVEL',
		title: 'Beautiful Cities in the World',
		date: 'Jan 7, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1600&auto=format&fit=crop',
	},
	editors: {
		tag1: "EDITOR'S PICK",
		tag2: 'TECH',
		title: 'Best Classic Film Cameras',
		date: 'Jan 4, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop',
	},
	trending: [
		{
			tag1: 'TRAVEL',
			tag2: 'TRENDING STORIES',
			title: 'Best Nightlife Cities in the World',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop',
		},
		{
			tag1: 'SPORTS',
			tag2: 'TRENDING STORIES',
			title: 'Tours with Ocean Sports',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop',
		},
	],
}

const Tag = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const OverlayCard = ({item, height = 'h-80'}) => (
	<div className={`relative rounded overflow-hidden card-hover ${height}`}>
		<img
			src={item.img}
			alt={item.title}
			className='w-full h-full object-cover'
		/>
		<div className='absolute inset-0 bg-linear-to-t from-black/70 to-black/0' />
		<div className='absolute bottom-0 p-4 text-white space-y-2'>
			<div className='flex gap-2'>
				<Tag color='bg-red-600'>{item.tag1}</Tag>
				<Tag>{item.tag2}</Tag>
			</div>
			<h3 className='text-lg md:text-xl font-semibold leading-snug'>
				{item.title}
			</h3>
			<p className='text-xs text-gray-200'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const TopStories = () => {
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='relative overflow-hidden pb-3 group'>
					<div className='flex items-center gap-4 whitespace-nowrap w-max animate-marquee'>
						{[...pills, ...pills].map((p, i) => (
							<div
								key={i}
								className='flex items-center gap-3 px-3 py-2 rounded-full bg-white text-gray-800 border border-gray-200 shadow-sm'>
								{p.indicator ? (
									<span className='relative grid place-items-center w-6 h-6 rounded-full border-2 border-red-300 bg-white'>
										<span className='w-2.5 h-2.5 rounded-full bg-red-600' />
									</span>
								) : p.img ? (
									<img
										src={p.img}
										alt={p.text}
										className='w-8 h-8 rounded-full object-cover'
									/>
								) : (
									<span className='inline-block w-8 h-8 rounded-full bg-gray-200' />
								)}
								<span className='text-sm font-medium'>{p.text}</span>
							</div>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
					<div className='md:col-span-6'>
						<div className='flex items-center justify-between mb-2'>
							<h2 className='text-gray-800 font-semibold'>Main Stories</h2>
							<div className='flex gap-2'>
								<button className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
									<ChevronLeft size={16} />
								</button>
								<button className='p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100'>
									<ChevronRight size={16} />
								</button>
							</div>
						</div>
						<OverlayCard
							item={data.main}
							height='h-[360px]'
						/>
					</div>

					<div className='md:col-span-3'>
						<h2 className='text-gray-800 font-semibold mb-2'>
							Editor&apos;s Pick
						</h2>
						<OverlayCard
							item={data.editors}
							height='h-[360px]'
						/>
					</div>

					<div className='md:col-span-3'>
						<h2 className='text-gray-800 font-semibold mb-2'>
							Trending Stories
						</h2>
						<div className='space-y-4'>
							{data.trending.map((t, idx) => (
								<OverlayCard
									key={idx}
									item={t}
									height='h-40'
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TopStories
