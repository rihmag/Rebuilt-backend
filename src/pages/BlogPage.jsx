import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Navbar from '../components/navbar'
import {getBlogById} from '../services/api'
import {Home, ChevronRight, User, Calendar} from 'lucide-react'

const BlogPage = () => {
	const {id} = useParams()
	const [blog, setBlog] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchBlog()
	}, [id])

	async function fetchBlog() {
		try {
			setLoading(true)
			setError(null)
			const data = await getBlogById(id)
			setBlog(data.blog)
		} catch (err) {
			setError(err.message || 'Failed to load blog')
		} finally {
			setLoading(false)
		}
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar />

			{/* Loading State */}
			{loading && (
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center'>
						<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
						<p className='mt-4 text-gray-600'>Loading blog...</p>
					</div>
				</div>
			)}

			{/* Error State */}
			{error && (
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center'>
						<div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
							<p className='text-red-600 font-medium mb-2'>Blog Not Found</p>
							<p className='text-gray-700 mb-4'>{error}</p>
							<Link
								to='/'
								className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* Blog Content */}
			{!loading && !error && blog && (
				<div className='bg-white'>
					{/* Hero Image */}
					<div className='w-full h-96 overflow-hidden'>
						<img
							src={blog.image}
							alt={blog.title}
							className='w-full h-full object-cover'
						/>
					</div>

					{/* Blog Content Container */}
					<div className='container mx-auto px-4 py-8'>
						<div className='max-w-4xl mx-auto'>
							{/* Breadcrumb */}
							<div className='flex items-center gap-2 text-sm text-gray-600 mb-6'>
								<Link
									to='/'
									className='hover:text-blue-600 flex items-center gap-1'>
									<Home size={16} />
									<span>Home</span>
								</Link>
								<ChevronRight size={16} />
								{blog.categoryId && (
									<>
										<Link
											to={`/category/${blog.categoryId.slug}`}
											className='hover:text-blue-600'>
											{blog.categoryId.name}
										</Link>
										<ChevronRight size={16} />
									</>
								)}
								<span className='text-gray-900 font-medium line-clamp-1'>
									{blog.title}
								</span>
							</div>

							{/* Category Badge */}
							{blog.categoryId && (
								<Link
									to={`/category/${blog.categoryId.slug}`}
									className='inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 hover:bg-blue-200 transition-colors'>
									{blog.categoryId.name}
								</Link>
							)}

							{/* Blog Title */}
							<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
								{blog.title}
							</h1>

							{/* Metadata */}
							<div className='flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200'>
								<div className='flex items-center gap-2'>
									<User size={20} />
									<span className='font-medium'>{blog.author}</span>
								</div>
								<div className='flex items-center gap-2'>
									<Calendar size={20} />
									<span>{formatDate(blog.date)}</span>
								</div>
							</div>

							{/* Blog Content */}
							<div className='prose prose-lg max-w-none'>
								<div className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
									{blog.description}
								</div>
							</div>

							{/* Back to Category Link */}
							{blog.categoryId && (
								<div className='mt-12 pt-8 border-t border-gray-200'>
									<Link
										to={`/category/${blog.categoryId.slug}`}
										className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium'>
										← Back to {blog.categoryId.name}
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BlogPage
