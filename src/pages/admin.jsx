import {useState, useEffect} from 'react'
import {Trash2, Pencil, X} from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
import {
	getCategories,
	createCategory,
	deleteCategory,
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
} from '../services/api'

export default function AdminPanel() {
	const [activeTab, setActiveTab] = useState('categories')
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [categoryName, setCategoryName] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		categoryId: null,
		categoryName: '',
	})

	const [blogs, setBlogs] = useState([])
	const [blogsLoading, setBlogsLoading] = useState(true)
	const [blogForm, setBlogForm] = useState({
		categoryId: '',
		title: '',
		description: '',
		author: '',
		date: new Date().toISOString().split('T')[0],
	})
	const [imageFile, setImageFile] = useState(null)
	const [imagePreview, setImagePreview] = useState(null)
	const [blogSubmitting, setBlogSubmitting] = useState(false)
	const [editModal, setEditModal] = useState({isOpen: false, blog: null})
	const [deleteBlogModal, setDeleteBlogModal] = useState({
		isOpen: false,
		blogId: null,
		blogTitle: '',
	})
	const [role, setRole] = useState('')

	useEffect(() => {
		const userRole = localStorage.getItem('role')
		setRole(userRole)
	}, [])

	useEffect(() => {
		if (role === 'maalik') {
			fetchCategories()
		}
	}, [role])

	if (role !== 'maalik') {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold text-red-600'>Access Denied</h1>
					<p className='mt-2 text-gray-600'>
						You are not authorized to view this page.
					</p>
				</div>
			</div>
		)
	}

	async function fetchCategories() {
		try {
			setLoading(true)
			const data = await getCategories()
			setCategories(data.categories || [])
		} catch (error) {
			toast.error(error.message || 'Failed to load categories')
		} finally {
			setLoading(false)
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()

		const trimmedName = categoryName.trim().replace(/\s+/g, ' ')

		if (!trimmedName) {
			toast.error('Category name is required')
			return
		}

		if (trimmedName.length < 1 || trimmedName.length > 40) {
			toast.error('Category name must be between 1 and 40 characters')
			return
		}

		const duplicate = categories.find(
			(cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
		)
		if (duplicate) {
			toast.error('Category already exists')
			return
		}

		try {
			setSubmitting(true)
			const data = await createCategory(trimmedName)
			setCategories((prev) =>
				[...prev, data.category].sort((a, b) => a.name.localeCompare(b.name))
			)
			setCategoryName('')
			toast.success('Category added successfully')
		} catch (error) {
			toast.error(error.message || 'Failed to add category')
		} finally {
			setSubmitting(false)
		}
	}

	function openDeleteModal(id, name) {
		setDeleteModal({isOpen: true, categoryId: id, categoryName: name})
	}

	function closeDeleteModal() {
		setDeleteModal({isOpen: false, categoryId: null, categoryName: ''})
	}

	async function confirmDelete() {
		const {categoryId} = deleteModal

		try {
			await deleteCategory(categoryId)
			setCategories((prev) => prev.filter((cat) => cat._id !== categoryId))
			toast.success('Successfully Deleted')
			closeDeleteModal()
		} catch (error) {
			toast.error(error.message || 'Failed to delete category')
			closeDeleteModal()
		}
	}

	useEffect(() => {
		if (activeTab === 'blogs' || activeTab === 'addBlog') {
			fetchBlogs()
		}
	}, [activeTab])

	async function fetchBlogs() {
		try {
			setBlogsLoading(true)
			const data = await getBlogs()
			setBlogs(data.blogs || [])
		} catch (error) {
			toast.error(error.message || 'Failed to load blogs')
		} finally {
			setBlogsLoading(false)
		}
	}

	function handleBlogFormChange(e) {
		const {name, value} = e.target
		setBlogForm((prev) => ({...prev, [name]: value}))
	}

	function handleImageChange(e) {
		const file = e.target.files[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error('Image size must be less than 5MB')
				return
			}
			setImageFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	function clearImage() {
		setImageFile(null)
		setImagePreview(null)
	}

	function resetBlogForm() {
		setBlogForm({
			categoryId: '',
			title: '',
			description: '',
			author: '',
			date: new Date().toISOString().split('T')[0],
		})
		clearImage()
	}

	async function handleBlogSubmit(e) {
		e.preventDefault()

		if (
			!blogForm.categoryId ||
			!blogForm.title ||
			!blogForm.description ||
			!blogForm.author ||
			!blogForm.date
		) {
			toast.error('All fields are required')
			return
		}

		if (!imageFile) {
			toast.error('Please select an image')
			return
		}

		if (
			blogForm.title.trim().length < 1 ||
			blogForm.title.trim().length > 200
		) {
			toast.error('Title must be between 1 and 200 characters')
			return
		}

		if (
			blogForm.description.trim().length < 10 ||
			blogForm.description.trim().length > 5000
		) {
			toast.error('Description must be between 10 and 5000 characters')
			return
		}

		if (
			blogForm.author.trim().length < 1 ||
			blogForm.author.trim().length > 100
		) {
			toast.error('Author must be between 1 and 100 characters')
			return
		}

		try {
			setBlogSubmitting(true)
			const formData = new FormData()
			formData.append('categoryId', blogForm.categoryId)
			formData.append('title', blogForm.title.trim())
			formData.append('description', blogForm.description.trim())
			formData.append('author', blogForm.author.trim())
			formData.append('date', blogForm.date)
			formData.append('image', imageFile)

			await createBlog(formData)
			toast.success('Blog Added Successfully')
			resetBlogForm()
			fetchBlogs()
		} catch (error) {
			toast.error(error.message || 'Failed to add blog')
		} finally {
			setBlogSubmitting(false)
		}
	}

	function openEditModal(blog) {
		setEditModal({isOpen: true, blog})
	}

	function closeEditModal() {
		setEditModal({isOpen: false, blog: null})
	}

	async function handleBlogUpdate(e) {
		e.preventDefault()
		const {blog} = editModal

		if (
			!blog.categoryId ||
			!blog.title ||
			!blog.description ||
			!blog.author ||
			!blog.date
		) {
			toast.error('All fields are required')
			return
		}

		if (blog.title.trim().length < 1 || blog.title.trim().length > 200) {
			toast.error('Title must be between 1 and 200 characters')
			return
		}

		if (
			blog.description.trim().length < 10 ||
			blog.description.trim().length > 5000
		) {
			toast.error('Description must be between 10 and 5000 characters')
			return
		}

		if (blog.author.trim().length < 1 || blog.author.trim().length > 100) {
			toast.error('Author must be between 1 and 100 characters')
			return
		}

		try {
			setBlogSubmitting(true)
			const formData = new FormData()
			formData.append('categoryId', blog.categoryId)
			formData.append('title', blog.title.trim())
			formData.append('description', blog.description.trim())
			formData.append('author', blog.author.trim())
			formData.append('date', blog.date)
			if (imageFile) {
				formData.append('image', imageFile)
			}

			await updateBlog(blog._id, formData)
			toast.success('Blog Updated Successfully')
			closeEditModal()
			clearImage()
			fetchBlogs()
		} catch (error) {
			toast.error(error.message || 'Failed to update blog')
		} finally {
			setBlogSubmitting(false)
		}
	}

	function openDeleteBlogModal(id, title) {
		setDeleteBlogModal({isOpen: true, blogId: id, blogTitle: title})
	}

	function closeDeleteBlogModal() {
		setDeleteBlogModal({isOpen: false, blogId: null, blogTitle: ''})
	}

	async function confirmDeleteBlog() {
		const {blogId} = deleteBlogModal

		try {
			await deleteBlog(blogId)
			setBlogs((prev) => prev.filter((blog) => blog._id !== blogId))
			toast.success('Blog Deleted Successfully')
			closeDeleteBlogModal()
		} catch (error) {
			toast.error(error.message || 'Failed to delete blog')
			closeDeleteBlogModal()
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})
	}

	function truncateText(text, maxLength) {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength) + '...'
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<Toaster
				position='top-right'
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 3000,
					style: {
						background: '#fff',
						color: '#363636',
						padding: '16px',
						borderRadius: '10px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
						fontSize: '14px',
						fontWeight: '500',
					},
					success: {
						duration: 3000,
						style: {
							background: '#10b981',
							color: '#fff',
						},
						iconTheme: {
							primary: '#fff',
							secondary: '#10b981',
						},
					},
					error: {
						duration: 4000,
						style: {
							background: '#ef4444',
							color: '#fff',
						},
						iconTheme: {
							primary: '#fff',
							secondary: '#ef4444',
						},
					},
					loading: {
						style: {
							background: '#3b82f6',
							color: '#fff',
						},
						iconTheme: {
							primary: '#fff',
							secondary: '#3b82f6',
						},
					},
				}}
			/>

			<div className='max-w-6xl mx-auto px-4 py-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
					<p className='text-gray-600 mt-1'>Manage store products</p>
				</div>

				{/* Tabs */}
				<div className='border-b border-gray-200 mb-8'>
					<div className='flex gap-8'>
						<button
							onClick={() => setActiveTab('categories')}
							className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
								activeTab === 'categories'
									? 'border-blue-600 text-blue-600'
									: 'border-transparent text-gray-500 hover:text-gray-700'
							}`}>
							Add Category
						</button>
						<button
							onClick={() => setActiveTab('addBlog')}
							className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
								activeTab === 'addBlog'
									? 'border-blue-600 text-blue-600'
									: 'border-transparent text-gray-500 hover:text-gray-700'
							}`}>
							Add Blog
						</button>
						<button
							onClick={() => setActiveTab('blogs')}
							className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
								activeTab === 'blogs'
									? 'border-blue-600 text-blue-600'
									: 'border-transparent text-gray-500 hover:text-gray-700'
							}`}>
							All Blogs
						</button>
					</div>
				</div>

				{/* Add Category Section */}
				{activeTab === 'categories' && (
					<>
						<div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
							<h2 className='text-xl font-semibold mb-4'>Add Category</h2>
							<form
								onSubmit={handleSubmit}
								className='flex gap-4'>
								<input
									type='text'
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
									placeholder='Enter category name'
									className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={submitting}
								/>
								<button
									type='submit'
									disabled={submitting}
									className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors'>
									{submitting ? 'Adding...' : 'Submit'}
								</button>
							</form>
						</div>

						{/* All Categories Section */}
						<div className='bg-white rounded-lg shadow-sm p-6'>
							<h2 className='text-xl font-semibold mb-4'>All Categories</h2>

							{loading ? (
								<div className='text-center py-8 text-gray-500'>
									Loading categories...
								</div>
							) : categories.length === 0 ? (
								<div className='text-center py-8 text-gray-500'>
									No categories yet.
								</div>
							) : (
								<div className='overflow-x-auto'>
									<table className='w-full'>
										<thead>
											<tr className='border-b border-gray-200'>
												<th className='text-left py-3 px-4 font-semibold text-gray-700'>
													Serial No.
												</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-700'>
													Name
												</th>
												<th className='text-left py-3 px-4 font-semibold text-gray-700'>
													Delete
												</th>
											</tr>
										</thead>
										<tbody>
											{categories.map((category, index) => (
												<tr
													key={category._id}
													className='border-b border-gray-100 hover:bg-gray-50'>
													<td className='py-3 px-4 text-gray-600'>
														{index + 1}
													</td>
													<td className='py-3 px-4 text-gray-900'>
														{category.name}
													</td>
													<td className='py-3 px-4'>
														<button
															onClick={() =>
																openDeleteModal(category._id, category.name)
															}
															className='text-red-600 hover:text-red-800 transition-colors'
															title='Delete category'>
															<Trash2 size={18} />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</>
				)}

				{/* Add Blog Section */}
				{activeTab === 'addBlog' && (
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h2 className='text-xl font-semibold mb-6'>Add Blog</h2>
						<form
							onSubmit={handleBlogSubmit}
							className='space-y-6'>
							{/* Category Dropdown */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Category <span className='text-red-500'>*</span>
								</label>
								<select
									name='categoryId'
									value={blogForm.categoryId}
									onChange={handleBlogFormChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={blogSubmitting}
									required>
									<option value=''>Select a category</option>
									{categories.map((category) => (
										<option
											key={category._id}
											value={category._id}>
											{category.name}
										</option>
									))}
								</select>
								{categories.length === 0 && (
									<p className='text-sm text-gray-500 mt-1'>
										No categories available. Please add a category first.
									</p>
								)}
							</div>

							{/* Title */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Title <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='title'
									value={blogForm.title}
									onChange={handleBlogFormChange}
									placeholder='Enter blog title'
									maxLength={200}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={blogSubmitting}
									required
								/>
								<p className='text-sm text-gray-500 mt-1'>
									{blogForm.title.length}/200 characters
								</p>
							</div>

							{/* Description */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Description <span className='text-red-500'>*</span>
								</label>
								<textarea
									name='description'
									value={blogForm.description}
									onChange={handleBlogFormChange}
									placeholder='Enter blog description'
									rows={6}
									maxLength={5000}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
									disabled={blogSubmitting}
									required
								/>
								<p className='text-sm text-gray-500 mt-1'>
									{blogForm.description.length}/5000 characters
								</p>
							</div>

							{/* Image Upload */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Image <span className='text-red-500'>*</span>
								</label>
								<input
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={blogSubmitting}
								/>
								{imagePreview && (
									<div className='mt-4 relative inline-block'>
										<img
											src={imagePreview}
											alt='Preview'
											className='max-w-xs h-auto rounded-lg border border-gray-300'
											style={{maxWidth: '300px'}}
										/>
										<button
											type='button'
											onClick={clearImage}
											className='absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700'>
											<X size={16} />
										</button>
									</div>
								)}
							</div>

							{/* Author */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Author <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='author'
									value={blogForm.author}
									onChange={handleBlogFormChange}
									placeholder='Enter author name'
									maxLength={100}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={blogSubmitting}
									required
								/>
								<p className='text-sm text-gray-500 mt-1'>
									{blogForm.author.length}/100 characters
								</p>
							</div>

							{/* Date */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Date <span className='text-red-500'>*</span>
								</label>
								<input
									type='date'
									name='date'
									value={blogForm.date}
									onChange={handleBlogFormChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									disabled={blogSubmitting}
									required
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								disabled={blogSubmitting || categories.length === 0}
								className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium'>
								{blogSubmitting ? 'Adding Blog...' : 'Submit'}
							</button>
						</form>
					</div>
				)}

				{/* All Blogs Section */}
				{activeTab === 'blogs' && (
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h2 className='text-xl font-semibold mb-4'>All Blogs</h2>

						{blogsLoading ? (
							<div className='text-center py-8 text-gray-500'>
								Loading blogs...
							</div>
						) : blogs.length === 0 ? (
							<div className='text-center py-8 text-gray-500'>
								No blogs yet. Add your first blog!
							</div>
						) : (
							<div className='overflow-x-auto'>
								<table className='w-full'>
									<thead>
										<tr className='border-b border-gray-200'>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												S.No
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Category
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Image
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Title
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Description
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Author
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Date
											</th>
											<th className='text-left py-3 px-4 font-semibold text-gray-700'>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{blogs.map((blog, index) => (
											<tr
												key={blog._id}
												className='border-b border-gray-100 hover:bg-gray-50'>
												<td className='py-3 px-4 text-gray-600'>{index + 1}</td>
												<td className='py-3 px-4 text-gray-900'>
													{blog.categoryId?.name || 'N/A'}
												</td>
												<td className='py-3 px-4'>
													<img
														src={blog.image}
														alt={blog.title}
														className='w-20 h-20 object-cover rounded'
													/>
												</td>
												<td className='py-3 px-4 text-gray-900'>
													{truncateText(blog.title, 50)}
												</td>
												<td className='py-3 px-4 text-gray-600'>
													{truncateText(blog.description, 100)}
												</td>
												<td className='py-3 px-4 text-gray-900'>
													{blog.author}
												</td>
												<td className='py-3 px-4 text-gray-600'>
													{formatDate(blog.date)}
												</td>
												<td className='py-3 px-4'>
													<div className='flex gap-2'>
														<button
															onClick={() => openEditModal(blog)}
															className='text-blue-600 hover:text-blue-800 transition-colors'
															title='Edit blog'>
															<Pencil size={18} />
														</button>
														<button
															onClick={() =>
																openDeleteBlogModal(blog._id, blog.title)
															}
															className='text-red-600 hover:text-red-800 transition-colors'
															title='Delete blog'>
															<Trash2 size={18} />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Delete Category Confirmation Modal */}
			{deleteModal.isOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							Confirm Delete
						</h3>
						<p className='text-gray-600 mb-6'>
							Are you sure you want to delete{' '}
							<span className='font-semibold'>
								"{deleteModal.categoryName}"
							</span>
							?
						</p>
						<div className='flex gap-3 justify-end'>
							<button
								onClick={closeDeleteModal}
								className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Blog Modal */}
			{editModal.isOpen && editModal.blog && (
				<div className='fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none'>
					<div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto'>
						{/* Modal Header with X button */}
						<div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl'>
							<h3 className='text-xl font-semibold text-gray-900'>Edit Blog</h3>
							<button
								onClick={closeEditModal}
								className='text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors'
								title='Close'>
								<X size={24} />
							</button>
						</div>

						{/* Modal Body */}
						<div className='px-6 py-6'>
							<form
								onSubmit={handleBlogUpdate}
								className='space-y-6'>
								{/* Category Dropdown */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Category <span className='text-red-500'>*</span>
									</label>
									<select
										value={
											editModal.blog.categoryId?._id ||
											editModal.blog.categoryId
										}
										onChange={(e) =>
											setEditModal((prev) => ({
												...prev,
												blog: {...prev.blog, categoryId: e.target.value},
											}))
										}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										disabled={blogSubmitting}
										required>
										<option value=''>Select a category</option>
										{categories.map((category) => (
											<option
												key={category._id}
												value={category._id}>
												{category.name}
											</option>
										))}
									</select>
								</div>

								{/* Title */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Title <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										value={editModal.blog.title}
										onChange={(e) =>
											setEditModal((prev) => ({
												...prev,
												blog: {...prev.blog, title: e.target.value},
											}))
										}
										placeholder='Enter blog title'
										maxLength={200}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										disabled={blogSubmitting}
										required
									/>
								</div>

								{/* Description */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Description <span className='text-red-500'>*</span>
									</label>
									<textarea
										value={editModal.blog.description}
										onChange={(e) =>
											setEditModal((prev) => ({
												...prev,
												blog: {...prev.blog, description: e.target.value},
											}))
										}
										placeholder='Enter blog description'
										rows={6}
										maxLength={5000}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
										disabled={blogSubmitting}
										required
									/>
								</div>

								{/* Image Upload */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Image{' '}
										{!imageFile && (
											<span className='text-gray-500 font-normal'>
												(Keep existing or upload new)
											</span>
										)}
									</label>

									{/* Show existing image */}
									{!imagePreview && editModal.blog.image && (
										<div className='mb-3'>
											<img
												src={editModal.blog.image}
												alt='Current'
												className='h-32 w-auto rounded-lg border border-gray-300 object-cover'
											/>
											<p className='text-xs text-gray-500 mt-1'>
												Current image
											</p>
										</div>
									)}

									<input
										type='file'
										accept='image/*'
										onChange={handleImageChange}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
										disabled={blogSubmitting}
									/>

									{imagePreview && (
										<div className='mt-3 relative inline-block'>
											<img
												src={imagePreview}
												alt='Preview'
												className='h-32 w-auto rounded-lg border border-gray-300 object-cover'
											/>
											<button
												type='button'
												onClick={clearImage}
												className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 shadow-md'>
												<X size={14} />
											</button>
											<p className='text-xs text-gray-500 mt-1'>
												New image preview
											</p>
										</div>
									)}
								</div>

								{/* Author */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Author <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										value={editModal.blog.author}
										onChange={(e) =>
											setEditModal((prev) => ({
												...prev,
												blog: {...prev.blog, author: e.target.value},
											}))
										}
										placeholder='Enter author name'
										maxLength={100}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										disabled={blogSubmitting}
										required
									/>
								</div>

								{/* Date */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Date <span className='text-red-500'>*</span>
									</label>
									<input
										type='date'
										value={editModal.blog.date?.split('T')[0] || ''}
										onChange={(e) =>
											setEditModal((prev) => ({
												...prev,
												blog: {...prev.blog, date: e.target.value},
											}))
										}
										className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										disabled={blogSubmitting}
										required
									/>
								</div>

								{/* Buttons */}
								<div className='flex gap-3 justify-end pt-4 border-t border-gray-200'>
									<button
										type='button'
										onClick={closeEditModal}
										className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
										disabled={blogSubmitting}>
										Cancel
									</button>
									<button
										type='submit'
										disabled={blogSubmitting}
										className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors'>
										{blogSubmitting ? 'Updating...' : 'Update Blog'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* Delete Blog Confirmation Modal */}
			{deleteBlogModal.isOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl'>
						<h3 className='text-xl font-semibold text-gray-900 mb-4'>
							Confirm Delete
						</h3>
						<p className='text-gray-600 mb-6'>
							Are you sure you want to delete the blog{' '}
							<span className='font-semibold'>
								"{deleteBlogModal.blogTitle}"
							</span>
							?
						</p>
						<div className='flex gap-3 justify-end'>
							<button
								onClick={closeDeleteBlogModal}
								className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
								Cancel
							</button>
							<button
								onClick={confirmDeleteBlog}
								className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
