import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Navbar from '../components/navbar'
import BlogTile from '../components/BlogTile'
import {getBlogsByCategory, getCategories, getBlogs} from '../services/api'
import {Home, ChevronRight, Search} from 'lucide-react'

const CategoryPage = () => {
	const {slug} = useParams()
	const [blogs, setBlogs] = useState([])
	const [category, setCategory] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [activeTab, setActiveTab] = useState('Popular')
	const [categoriesList, setCategoriesList] = useState([])
	const [counts, setCounts] = useState({})

	useEffect(() => {
		fetchBlogs()
	}, [slug])

	async function fetchBlogs() {
		try {
			setLoading(true)
			setError(null)
			const data = await getBlogsByCategory(slug)
			setBlogs(data.blogs || [])
			setCategory(data.category)
		} catch (err) {
			setError(err.message || 'Failed to load blogs')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCatsAndCounts()
	}, [])

	async function fetchCatsAndCounts() {
		try {
			const [catRes, allBlogsRes] = await Promise.all([
				getCategories(),
				getBlogs(),
			])
			setCategoriesList(catRes.categories || [])
			const map = {}
			;(allBlogsRes.blogs || []).forEach((b) => {
				const id = b.categoryId?._id || b.categoryId
				map[id] = (map[id] || 0) + 1
			})
			setCounts(map)
		} catch (e) {}
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar />

			<div className='container mx-auto px-4 py-8'>
				{/* Breadcrumb */}
				<div className='flex items-center gap-2 text-sm text-gray-600 mb-6'>
					<Link
						to='/'
						className='hover:text-blue-600 flex items-center gap-1'>
						<Home size={16} />
						<span>Home</span>
					</Link>
					<ChevronRight size={16} />
					<span className='text-gray-900 font-medium'>
						{category?.name || 'Category'}
					</span>
				</div>

				{/* Page Header */}
				<div className='mb-8'>
					<h1 className='text-4xl font-bold text-gray-900 mb-2'>
						{category?.name || 'Category'}
					</h1>
					<p className='text-gray-600'>Browse all articles in this category</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className='text-center py-12'>
						<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
						<p className='mt-4 text-gray-600'>Loading blogs...</p>
					</div>
				)}

				{/* Error State */}
				{error && (
					<div className='text-center py-12'>
						<div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
							<p className='text-red-600 font-medium mb-2'>Error</p>
							<p className='text-gray-700 mb-4'>{error}</p>
							<Link
								to='/'
								className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
								Back to Home
							</Link>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!loading && !error && blogs.length === 0 && (
					<div className='text-center py-12'>
						<div className='bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto'>
							<p className='text-gray-600 text-lg mb-2'>No blogs found</p>
							<p className='text-gray-500 mb-4'>
								There are no articles in this category yet.
							</p>
							<Link
								to='/'
								className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
								Browse Other Categories
							</Link>
						</div>
					</div>
				)}

				{/* Content with Sidebar */}
				{!loading && !error && blogs.length > 0 && (
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
						{/* Left: Main Grid */}
						<div className='lg:col-span-8'>
							<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
								{blogs.map((blog) => (
									<BlogTile
										key={blog._id}
										blog={blog}
									/>
								))}
							</div>
						</div>

						{/* Right: Sidebar */}
						<aside className='lg:col-span-4 space-y-6'>
							<div className='bg-white border border-gray-200 rounded-lg p-4'>
								<div className='flex items-center'>
									<input
										type='text'
										placeholder='Search'
										className='flex-1 px-3 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500'
									/>
									<button className='px-3 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700'>
										<Search size={18} />
									</button>
								</div>
							</div>

							{/* Move Popular/Recent/Commented */}
							<div className='bg-white border border-gray-200 rounded-lg'>
								<div className='flex'>
									{['Popular', 'Recent', 'Commented'].map((tab) => (
										<button
											key={tab}
											onClick={() => setActiveTab(tab)}
											className={`flex-1 px-4 py-2 text-sm font-medium border-b ${
												activeTab === tab
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-600 hover:bg-gray-50'
											}`}>
											{tab}
										</button>
									))}
								</div>
								<div className='p-4 space-y-4'>
									{(activeTab === 'Popular'
										? blogs
										: activeTab === 'Recent'
										? [...blogs].reverse()
										: blogs
									)
										.slice(0, 5)
										.map((b) => (
											<Link
												to={`/blog/${b._id}`}
												key={`${activeTab}-${b._id}`}
												className='flex gap-3 group'>
												<div className='w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100'>
													<img
														src={b.image}
														alt={b.title}
														className='w-full h-full object-cover group-hover:scale-105 transition-transform'
													/>
												</div>
												<div className='min-w-0'>
													<div className='text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600'>
														{b.title}
													</div>
													<div className='text-xs text-gray-500 mt-1'>
														{new Date(b.date).toLocaleDateString('en-GB', {
															day: '2-digit',
															month: 'short',
															year: 'numeric',
														})}
													</div>
												</div>
											</Link>
										))}
								</div>
							</div>

							{/* Categories */}
							<div className='bg-white border border-gray-200 rounded-lg'>
								<div className='px-4 py-3 border-b border-gray-200 flex items-center gap-2'>
									<div className='w-1 h-5 bg-blue-600 rounded-sm' />
									<h3 className='text-sm font-semibold text-gray-800'>
										Categories
									</h3>
								</div>
								<div className='p-4'>
									<ul className='space-y-2'>
										{categoriesList.map((cat) => (
											<li key={cat._id}>
												<Link
													to={`/category/${cat.slug}`}
													className={`text-sm hover:text-blue-700 ${
														slug === cat.slug
															? 'text-blue-700 font-medium'
															: 'text-gray-700'
													}`}>
													{cat.name}{' '}
													<span className='text-gray-500'>
														({counts[cat._id] || 0})
													</span>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</aside>
					</div>
				)}
			</div>
		</div>
	)
}

export default CategoryPage
