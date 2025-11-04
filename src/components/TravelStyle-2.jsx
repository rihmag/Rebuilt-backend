const Tag = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const OverlayCard = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden card-hover'>
		<div className='relative h-44 md:h-56'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
			<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
			<div className='absolute left-3 bottom-3 right-3 text-white'>
				<div className='flex gap-2 mb-2'>
					{item.tags.map((t, i) => (
						<Tag
							key={i}
							color={i === 0 ? 'bg-red-600' : 'bg-red-700'}>
							{t}
						</Tag>
					))}
				</div>
				<h3 className='text-lg md:text-xl font-semibold leading-tight drop-shadow'>
					{item.title}
				</h3>
				<p className='text-xs text-gray-200 mt-1'>
					{item.date} / {item.author}
				</p>
			</div>
		</div>
	</div>
)

const items = [
	{
		tags: ['MAIN STORIES', 'TRAVEL'],
		title: 'Beautiful Cities in the World',
		date: 'Jan 17, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1600&auto=format&fit=crop',
	},
	{
		tags: ['TRAVEL', 'TRENDING STORIES'],
		title: 'Best Nightlife Cities in the World',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
	},
	{
		tags: ['POPULAR', 'TRAVEL'],
		title: 'Eiffel Tower Visit Paris City Tour',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1600&auto=format&fit=crop',
	},
	{
		tags: ['RECOMMENDED', 'TRAVEL'],
		title: 'Holiday Tour in Dubai',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1475738972911-5b44ce984c42?q=80&w=1600&auto=format&fit=crop',
	},
]

const TravelStyle2 = () => {
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<h2 className='text-gray-800 font-semibold'>Travel – Style 2</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{items.map((it, idx) => (
						<OverlayCard
							key={idx}
							item={it}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default TravelStyle2
