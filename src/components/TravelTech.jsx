const Tag = ({children, color = 'text-red-600'}) => (
	<span className={`text-[11px] font-bold uppercase tracking-wide ${color}`}>
		{children}
	</span>
)

const Featured = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden'>
		<div className='h-44 md:h-56 relative'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
		</div>
		<div className='p-4'>
			<div className='flex items-center gap-3 text-[11px] font-semibold mb-1'>
				<Tag>MAIN STORIES</Tag>
				<Tag color='text-red-700'>{item.tag}</Tag>
			</div>
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

const RowCard = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden flex gap-3 p-3 items-start'>
		<img
			src={item.img}
			alt={item.title}
			className='w-24 h-16 object-cover rounded'
		/>
		<div className='min-w-0'>
			<div className='flex items-center gap-2 text-[11px] font-semibold'>
				<Tag color='text-red-600'>{item.tag1}</Tag>
				{item.tag2 && <Tag color='text-red-700'>{item.tag2}</Tag>}
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

const travel = {
	title: 'Travel',
	featured: {
		tag: 'TRAVEL',
		title: 'Beautiful Cities in the World',
		date: 'Jan 17, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1600&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	list: [
		{
			tag1: 'TRAVEL',
			tag2: 'TRENDING STORIES',
			title: 'Best Nightlife Cities in the World',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop',
		},
		{
			tag1: 'POPULAR',
			tag2: 'TRAVEL',
			title: 'Eiffel Tower Visit Paris City Tour',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop',
		},
	],
}

const tech = {
	title: 'Technology',
	featured: {
		tag: 'TECH',
		title: 'MacBook Pro for Business Man',
		date: 'Jan 19, 2019',
		author: 'Theme Horse',
		img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
	},
	list: [
		{
			tag1: 'POPULAR',
			tag2: 'TECH',
			title: 'Best Microsoft Surface Laptop',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=400&auto=format&fit=crop',
		},
		{
			tag1: 'TECH',
			title: 'Flying into the Future with Drone Technology',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop',
		},
	],
}

const Column = ({data}) => (
	<div>
		<h2 className='text-gray-800 font-semibold mb-3'>{data.title}</h2>
		<Featured item={data.featured} />
		<div className='mt-4 space-y-4'>
			{data.list.map((it, i) => (
				<RowCard
					key={i}
					item={it}
				/>
			))}
		</div>
	</div>
)

const TravelTech = () => {
	return (
		<section className='bg-gray-50'>
			<div className='container mx-auto px-4 py-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
					<Column data={travel} />
					<Column data={tech} />
				</div>
			</div>
		</section>
	)
}

export default TravelTech
