const Tag = ({children, color = 'text-red-600'}) => (
	<span className={`text-[11px] font-bold uppercase tracking-wide ${color}`}>
		{children}
	</span>
)

const FeaturedSplit = ({item}) => (
	<div className='bg-white border border-gray-200 rounded overflow-hidden grid grid-cols-1 md:grid-cols-2 card-hover'>
		<div className='h-44 md:h-56 lg:h-64'>
			<img
				src={item.img}
				alt={item.title}
				className='w-full h-full object-cover'
			/>
		</div>
		<div className='p-4'>
			<Tag>FASHION</Tag>
			<h3 className='text-xl md:text-2xl font-semibold text-gray-900 leading-snug mt-1'>
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
	<div className='bg-white border border-gray-200 rounded overflow-hidden flex gap-3 p-3 items-start card-hover'>
		<img
			src={item.img}
			alt={item.title}
			className='w-24 h-16 object-cover rounded'
		/>
		<div className='min-w-0'>
			<div className='flex items-center gap-2 text-[11px] font-semibold'>
				<Tag>FASHION</Tag>
				{item.sub && <Tag color='text-red-700'>{item.sub}</Tag>}
			</div>
			<h4 className='text-sm md:text-base font-semibold text-gray-900 mt-1 line-clamp-2'>
				{item.title}
			</h4>
			<p className='text-[11px] text-gray-500'>
				{item.date} / {item.author}
			</p>
		</div>
	</div>
)

const featured = {
	title: 'Women’s high fashion heels',
	date: 'Jan 16, 2019',
	author: 'Theme Horse',
	img: 'https://images.unsplash.com/photo-1504575702566-733b5aa0b5fd?q=80&w=1600&auto=format&fit=crop',
	excerpt:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
}

const listRows = [
	[
		{
			title: 'Wedding Dresses and Fashion Accessories',
			date: 'Jan 16, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
		},
		{
			title: 'Perfect Suit for Every Type of Guy',
			sub: 'MAIN STORIES',
			date: 'Jan 15, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1494955464529-790512c65305?q=80&w=400&auto=format&fit=crop',
		},
	],
	[
		{
			title: 'The Best Red Lipsticks of all Time',
			sub: 'RECOMMENDED',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=400&auto=format&fit=crop',
		},
		{
			title: 'Must Have Makeup Accessories',
			sub: 'RECOMMENDED',
			date: 'Jan 14, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=400&auto=format&fit=crop',
		},
	],
]

const FashionStyle2 = () => {
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex items-center justify-between mb-3'>
					<h2 className='text-gray-800 font-semibold'>Fashion – Style 2</h2>
				</div>

				<FeaturedSplit item={featured} />

				<div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{listRows[0].map((it, i) => (
						<RowCard
							key={`row1-${i}`}
							item={it}
						/>
					))}
				</div>
				<div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
					{listRows[1].map((it, i) => (
						<RowCard
							key={`row2-${i}`}
							item={it}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default FashionStyle2
