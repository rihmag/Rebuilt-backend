const healthData = {
	feature: {
		tag: 'HEALTH',
		title: 'Exercise Tips to Improve Your Health',
		date: 'Jan 16, 2019',
		author: 'Theme Horse',
		excerpt:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eros ante, placerat ac pulvinar at, iaculis a quam. Duis ut risus lobortis diam molestie vehicula. Nunc aliquet lectus at egestas...',
		img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop',
	},
	list: [
		{
			tag: 'HEALTH',
			title: 'Things to know for HealthCare Consultant',
			date: 'Jan 15, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop',
		},
		{
			tag: 'HEALTH',
			title: 'Health Benefits of Daily Yoga Practice',
			date: 'Jan 15, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1526404803658-8b6a5c1c6c3a?q=80&w=400&auto=format&fit=crop',
		},
		{
			tag: 'HEALTH',
			subTag: 'RECOMMENDED',
			title: 'Popular Weight Loss Pills Reviewed',
			date: 'Jan 15, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop',
		},
		{
			tag: 'HEALTH',
			title: 'Healthiest Fruits on the Planet',
			date: 'Jan 15, 2019',
			author: 'Theme Horse',
			img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
		},
	],
}

const Pill = ({text, color = 'bg-red-600'}) => (
	<span
		className={`text-[10px] font-semibold text-white px-2 py-1 rounded ${color}`}>
		{text}
	</span>
)

const Health = () => {
	const f = healthData.feature
	return (
		<section className='bg-gray-50 animate-fade-up'>
			<div className='max-w-6xl mx-auto px-2 sm:px-3 py-6'>
				<h2 className='text-gray-800 font-semibold mb-3'>Health</h2>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
					<div className='md:col-span-8'>
						<div className='bg-white border border-gray-200 rounded overflow-hidden card-hover'>
							<div className='relative h-52 md:h-60'>
								<img
									src={f.img}
									alt={f.title}
									className='w-full h-full object-cover'
								/>
							</div>
							<div className='p-3'>
								<Pill text={f.tag} />
								<h3 className='mt-1.5 text-xl font-semibold text-gray-900'>
									{f.title}
								</h3>
								<p className='text-xs text-gray-500 mt-1'>
									{f.date} / {f.author}
								</p>
								<p className='text-[13px] text-gray-700 mt-2 leading-relaxed'>
									{f.excerpt}
								</p>
							</div>
						</div>
					</div>

					<div className='md:col-span-4 space-y-3'>
						{healthData.list.map((it, i) => (
							<div
								key={i}
								className='bg-white border border-gray-200 rounded p-3 flex gap-3 items-start card-hover'>
								<img
									src={it.img}
									alt={it.title}
									className='w-20 h-16 object-cover rounded'
								/>
								<div className='min-w-0'>
									<div className='flex gap-2'>
										<Pill text={it.tag} />
										{it.subTag && (
											<Pill
												text={it.subTag}
												color='bg-red-700'
											/>
										)}
									</div>
									<h4 className='text-sm font-semibold text-gray-900 mt-1 line-clamp-2'>
										{it.title}
									</h4>
									<p className='text-[11px] text-gray-500'>
										{it.date} / {it.author}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Health
