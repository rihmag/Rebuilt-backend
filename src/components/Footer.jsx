const links = [
	{label: 'Home', href: '/'},
	{label: 'Tech', href: '/tech'},
	{label: 'Travel', href: '/travel'},
	{label: 'Health', href: '/health'},
	{label: 'Fashion', href: '/fashion'},
	{label: 'Sports', href: '/sports'},
	{label: 'Blog', href: '/blog'},
	{label: 'Support', href: '/support'},
	{label: 'Subscribe', href: '/subscribe'},
]

const categories = [
	"Editor's Pick",
	'Main Stories',
	'Popular',
	'Recommended',
	'Trending Stories',
]

const Social = ({brand, url}) => (
	<a
		href={url}
		className='w-9 h-9 grid place-items-center rounded-sm bg-gray-700/90 border border-gray-600 hover:bg-gray-600 transition-colors'
		aria-label={brand}>
		<img
			src={`https://cdn.simpleicons.org/${brand}/d1d5db`}
			alt={brand}
			className='w-4 h-4'
			loading='lazy'
		/>
	</a>
)

const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className='bg-[#0f0f0f] text-gray-300 mt-8 animate-fadeUp'>
			<div className='container mx-auto px-4 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
					<div className='md:col-span-4'>
						<div className='flex items-center gap-3'>
							<img
								src='/Logo/Logo.jpeg'
								alt='Rebuilt India'
								className='h-10 w-auto object-contain'
							/>
							<div>
								<div className='text-xl font-bold text-white'>
									Rebuilt India
								</div>
								<div className='text-gray-400 text-sm'>
									News, Tech, Travel and more
								</div>
							</div>
						</div>
						<p className='mt-3 text-sm leading-relaxed text-gray-400'>
							Rebuilt India is your modern news and magazine portal built with
							performance and accessibility in mind. Explore categories across
							technology, travel, sports, fashion and health.
						</p>
						<div className='mt-4 flex gap-2'>
							{['facebook', 'youtube', 'linkedin', 'instagram'].map((b) => (
								<Social
									key={b}
									brand={b}
									url='#'
								/>
							))}
						</div>
					</div>

					<div className='md:col-span-3'>
						<h4 className='text-white font-semibold mb-3'>Quick Links</h4>
						<ul className='space-y-2 text-sm'>
							{links.map((l) => (
								<li key={l.href}>
									<a
										href={l.href}
										className='text-gray-300 hover:text-white transition-colors'>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className='md:col-span-3'>
						<h4 className='text-white font-semibold mb-3'>Categories</h4>
						<ul className='space-y-2 text-sm'>
							{categories.map((c) => (
								<li key={c}>
									<a
										href='#'
										className='text-gray-300 hover:text-white transition-colors'>
										{c}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div className='md:col-span-2'>
						<h4 className='text-white font-semibold mb-3'>Newsletter</h4>
						<p className='text-sm text-gray-400'>
							Get our best stories delivered to your inbox.
						</p>
						<form
							className='mt-3'
							onSubmit={(e) => e.preventDefault()}>
							<div className='flex'>
								<input
									type='email'
									required
									placeholder='Your email'
									className='w-full rounded-l bg-[#161616] border border-gray-700 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-1 focus:ring-red-600'
								/>
								<button className='rounded-r bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white'>
									Subscribe
								</button>
							</div>
						</form>
						<p className='text-xs text-gray-500 mt-2'>
							We respect your privacy. Unsubscribe at any time.
						</p>
					</div>
				</div>
			</div>

			<div className='border-t border-white/10'>
				<div className='container mx-auto px-4 py-4 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between'>
					<div>© {year} Rebuilt India. All rights reserved.</div>
					<div className='flex gap-4 mt-2 sm:mt-0'>
						<a
							href='#'
							className='hover:text-white'>
							Terms
						</a>
						<a
							href='#'
							className='hover:text-white'>
							Privacy
						</a>
						<a
							href='#'
							className='hover:text-white'>
							Contact
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
