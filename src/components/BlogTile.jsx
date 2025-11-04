import {Link} from 'react-router-dom'
import {User, Calendar} from 'lucide-react'

const BlogTile = ({blog}) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})
	}

	return (
		<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group'>
			{/* Blog Image */}
			<div className='relative overflow-hidden aspect-video'>
				<img
					src={blog.image}
					alt={blog.title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
				/>
			</div>

			{/* Blog Content */}
			<div className='p-5'>
				{/* Title */}
				<h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-14'>
					{blog.title}
				</h3>

				{/* Metadata */}
				<div className='flex items-center gap-4 text-sm text-gray-600 mb-4'>
					<div className='flex items-center gap-1'>
						<User size={16} />
						<span>{blog.author}</span>
					</div>
					<div className='flex items-center gap-1'>
						<Calendar size={16} />
						<span>{formatDate(blog.date)}</span>
					</div>
				</div>

				{/* Read More Button */}
				<Link
					to={`/blog/${blog._id}`}
					className='inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'>
					Read More
				</Link>
			</div>
		</div>
	)
}

export default BlogTile
