const Pill = ({children}) => (
	<span className='text-[11px] font-bold uppercase tracking-wide text-red-600'>
		{children}
	</span>
)

const Featured = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden'>
		<div className='h-40 md:h-44 lg:h-52'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
		</div>
		<div className='p-4'>
			<Pill>SPORTS</Pill>
			<h3 className='text-xl font-semibold text-gray-900 leading-snug mt-1'>
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

const RowCard = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden flex gap-3 p-3 items-start'>
		<img
			src={item.img}
			alt={item.title}
			className='w-20 h-16 object-cover rounded'
		/>
		<div className='min-w-0'>
			<div className='flex gap-2'>
				{item.tags?.map((t, i) => (
					<span
						key={i}
						className={`text-[11px] font-bold uppercase tracking-wide ${
							i === 0 ? 'text-red-600' : 'text-red-700'
						}`}>
						{t}
					</span>
				)) || <Pill>SPORTS</Pill>}
			</div>
			<h4 className='text-base font-semibold text-gray-900 mt-1 line-clamp-2'>
				{item.title}
			</h4>
			<p className='text-[11px] text-gray-500'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const data = {
	featured: {
		title: 'Inside the wonderful world of cycle racing',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	list: [
		{
			tags: ['POPULAR', 'SPORTS'],
			title: 'Common GYM Mistakes to Avoid',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: '../images/img-2.jpg',
		},
		{
			tags: ['SPORTS', 'TRENDING STORIES'],
			title: 'Tours with Ocean Sports',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=400&auto=format&fit=crop',
		},
		{
			tags: ['POPULAR', 'SPORTS'],
			title: 'Cars you Should Buy',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=400&auto=format&fit=crop',
		},
		{
			title: 'FIFA World Cup top Goal Scorers',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=400&auto=format&fit=crop',
		},
	],
}

const SportStyle3 = () => {
	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between mb-1'>
				<h2 className='text-gray-800 font-semibold'>Sports – Style 3</h2>
			</div>
			<Featured item={data.featured} />
			{data.list.map((it, i) => (
				<RowCard
					key={i}
					item={it}
				/>
			))}
		</div>
	)
}

export default SportStyle3
