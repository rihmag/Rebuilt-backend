import {useState, useEffect} from 'react'
import {Search, Linkedin as LinkedinIcon} from 'lucide-react'
import {getCategories} from '../services/api'

const Navbar = () => {
	const [categories, setCategories] = useState([])

	const currentDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	useEffect(() => {
		async function fetchCategories() {
			try {
				const data = await getCategories()
				setCategories(data.categories || [])
			} catch (error) {
				console.error('Failed to load categories:', error)
			}
		}
		fetchCategories()
	}, [])

	// Social icons rendered as brand SVGs from Simple Icons CDN
	// Colors: icon (gray-300), button bg (gray-700), hover bg (gray-600)
	const socialIcons = [
		{name: 'Facebook', brand: 'facebook', url: '#'},
		{name: 'YouTube', brand: 'youtube', url: '#'},
		{name: 'LinkedIn', brand: 'linkedin', url: '#'},
		{name: 'Instagram', brand: 'instagram', url: '#'},
	]

	return (
		<nav className='w-full'>
			{/* Top Bar */}
			<div className='bg-[#1a1a1a] text-white text-sm'>
				<div className='container mx-auto px-4 py-2 flex justify-between items-center'>
					<div className='text-gray-300'>{currentDate}</div>
					<div className='flex items-center gap-6'>
						<a
							href='#'
							className='text-gray-300 hover:text-red-400 transition-colors'>
							Support
						</a>
						<span className='text-gray-500'>|</span>
						<a
							href='#'
							className='text-gray-300 hover:text-red-400 transition-colors'>
							Documentation
						</a>
						<span className='text-gray-500'>|</span>
						<a
							href='#'
							className='text-gray-300 hover:text-red-400 transition-colors'>
							Buy It Now
						</a>
						<div className='flex items-center gap-2 ml-4'>
							{socialIcons.map((social, index) => (
								<a
									key={index}
									href={social.url}
									aria-label={social.name}
									className='w-9 h-9 grid place-items-center rounded-sm bg-black/80 border border-red-700 hover:bg-red-700 transition-colors'>
									{social.brand === 'linkedin' ? (
										<LinkedinIcon
											size={16}
											className='text-red-300'
										/>
									) : (
										<img
											src={`https://cdn.simpleicons.org/${social.brand}/fca5a5`}
											alt={social.name}
											className='w-4 h-4'
											loading='lazy'
											width='16'
											height='16'
										/>
									)}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Logo and Advertisement Section */}
			<div className='bg-black text-white py-6'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					{/* Logo */}
					<a
						href='/'
						className='flex items-center gap-3'>
						<img
							src='/Logo/Logo.jpeg'
							alt='Site logo'
							className='h-12 w-auto object-contain'
							loading='eager'
							decoding='async'
						/>
						<div className='leading-tight'>
							<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'>
								Rebuilt India
							</h1>
							<p className='text-gray-400 text-xs sm:text-sm mt-0.5'>
								News, Tech, Travel and more
							</p>
						</div>
					</a>

					{/* Advertisement Banner */}
					<div className='bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 rounded-lg flex items-center gap-4'>
						<div>
							<div className='text-2xl font-bold'>ADVERTISEMENT SECTION</div>
							<div className='text-sm text-red-200'>
								EASILY ADD BANNER ADVERTISEMENT HERE
							</div>
						</div>
						<div className='bg-white text-black px-4 py-2 rounded font-bold text-sm'>
							ADVERTISEMENT
							<br />
							SECTION
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Menu */}
			<div className='bg-[#b91c1c] text-white'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between'>
						<ul className='flex items-center'>
							{/* Home Link */}
							<li>
								<a
									href='/'
									className='flex items-center gap-1 px-4 py-4 text-sm font-medium hover:bg-black transition-colors'>
									HOME
								</a>
							</li>

							{/* Dynamic Category Links */}
							{categories.map((category) => (
								<li key={category._id}>
									<a
										href={`/category/${category.slug}`}
										className='flex items-center gap-1 px-4 py-4 text-sm font-medium hover:bg-black transition-colors'>
										{category.name.toUpperCase()}
									</a>
								</li>
							))}
						</ul>
						<button
							className='p-3 hover:bg-black transition-colors'
							aria-label='Search'>
							<Search size={20} />
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
