const Tag = ({children, color = 'bg-red-600'}) => (
	<span
		className={`text-white text-[10px] font-semibold px-2 py-1 rounded ${color}`}>
		{children}
	</span>
)

const Card = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden card-hover'>
		<div className='relative h-36 md:h-40'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
			<div className='absolute left-3 bottom-3 flex gap-2'>
				{item.tags.map((t, i) => (
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
		<div className='p-4'>
			<h3 className='text-lg font-semibold text-gray-900 leading-snug line-clamp-2'>
				{item.title}
			</h3>
			<p className='text-xs text-gray-500 mt-1'>
				{item.date} / {item.author}
			</p>
			<p className='text-[13px] text-gray-700 mt-2 leading-relaxed line-clamp-3'>
				{item.excerpt}
			</p>
		</div>
	</div>
)

const items = [
	{
		tags: ['MAIN STORIES', 'TECH'],
		title: 'MacBook Pro for Business Man',
		date: 'Jan 19, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	{
		tags: ['MAIN STORIES', 'TRAVEL'],
		title: 'Beautiful Cities in the World',
		date: 'Jan 17, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	{
		tags: ['TRAVEL', 'TRENDING STORIES'],
		title: 'Best Nightlife Cities in the World',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	{
		tags: ['POPULAR', 'TRAVEL'],
		title: 'Eiffel Tower Visit Paris City Tour',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	{
		tags: ['RECOMMENDED', 'TRAVEL'],
		title: 'Holiday Tour in Dubai',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1475738972911-5b44ce984c42?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	{
		tags: ['POPULAR', 'TECH'],
		title: 'Best Microsoft Surface Laptop',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
]

const Random = () => {
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<h2 className='text-gray-800 font-semibold'>Random Posts</h2>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{items.map((it, idx) => (
						<Card
							key={idx}
							item={it}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default Random
