import express from 'express'
import Blog from '../models/Blog.js'
import Category from '../models/Category.js'
import upload, {cloudinary} from '../middleware/cloudinaryUpload.js'
import isAuthenticated from '../middleware/authmiddleware.js'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.find({isActive: true})
			.populate('categoryId', 'name')
			.sort({date: -1})
		res.json({blogs})
	} catch (error) {
		console.error('Error fetching blogs:', error)
		res.status(500).json({message: 'Failed to fetch blogs'})
	}
})

router.get('/category/:slug', async (req, res) => {
	try {
		const {slug} = req.params

		const category = await Category.findOne({slug})
		if (!category) {
			return res.status(404).json({message: 'Category not found'})
		}

		const blogs = await Blog.find({categoryId: category._id, isActive: true})
			.populate('categoryId', 'name slug')
			.sort({date: -1})

		res.json({blogs, category: {name: category.name, slug: category.slug}})
	} catch (error) {
		console.error('Error fetching blogs by category:', error)
		res.status(500).json({message: 'Failed to fetch blogs'})
	}
})

router.get('/:id', async (req, res) => {
	try {
		const {id} = req.params

		const blog = await Blog.findById(id).populate('categoryId', 'name slug')

		if (!blog) {
			return res.status(404).json({message: 'Blog not found'})
		}

		res.json({blog})
	} catch (error) {
		console.error('Error fetching blog:', error)
		res.status(500).json({message: 'Failed to fetch blog'})
	}
})

router.post('/',isAuthenticated, upload.single('image'), async (req, res) => {
	try {
		const {categoryId, title, description, author, date} = req.body

		if (!categoryId || !title || !description || !author || !date) {
			return res.status(400).json({message: 'All fields are required'})
		}

		if (!req.file) {
			return res.status(400).json({message: 'Image is required'})
		}

		const category = await Category.findById(categoryId)
		if (!category) {
			return res.status(400).json({message: 'Invalid category'})
		}

		if (title.trim().length < 1 || title.trim().length > 200) {
			return res
				.status(400)
				.json({message: 'Title must be between 1 and 200 characters'})
		}

		if (description.trim().length < 10 || description.trim().length > 5000) {
			return res
				.status(400)
				.json({message: 'Description must be between 10 and 5000 characters'})
		}

		if (author.trim().length < 1 || author.trim().length > 100) {
			return res
				.status(400)
				.json({message: 'Author must be between 1 and 100 characters'})
		}

		const imageUrl = req.file.path

		const blog = new Blog({
			categoryId,
			title: title.trim(),
			description: description.trim(),
			image: imageUrl,
			author: author.trim(),
			date: new Date(date),
		})

		await blog.save()

		await blog.populate('categoryId', 'name')

		res.status(201).json({blog, message: 'Blog created successfully'})
	} catch (error) {
		console.error('Error creating blog:', error)
		res.status(500).json({message: error.message || 'Failed to create blog'})
	}
})

router.put('/:id', isAuthenticated,upload.single('image'), async (req, res) => {
	try {
		const {id} = req.params
		const {categoryId, title, description, author, date} = req.body

		const blog = await Blog.findById(id)
		if (!blog) {
			return res.status(404).json({message: 'Blog not found'})
		}

		if (!categoryId || !title || !description || !author || !date) {
			return res.status(400).json({message: 'All fields are required'})
		}

		const category = await Category.findById(categoryId)
		if (!category) {
			return res.status(400).json({message: 'Invalid category'})
		}

		if (title.trim().length < 1 || title.trim().length > 200) {
			return res
				.status(400)
				.json({message: 'Title must be between 1 and 200 characters'})
		}

		if (description.trim().length < 10 || description.trim().length > 5000) {
			return res
				.status(400)
				.json({message: 'Description must be between 10 and 5000 characters'})
		}

		if (author.trim().length < 1 || author.trim().length > 100) {
			return res
				.status(400)
				.json({message: 'Author must be between 1 and 100 characters'})
		}

		blog.categoryId = categoryId
		blog.title = title.trim()
		blog.description = description.trim()
		blog.author = author.trim()
		blog.date = new Date(date)

		if (req.file) {
			if (blog.image) {
				try {
					const publicId = blog.image
						.split('/')
						.slice(-2)
						.join('/')
						.split('.')[0]
					await cloudinary.uploader.destroy(`rebuilt-india/blogs/${publicId}`)
				} catch (error) {
					console.error('Error deleting old image from Cloudinary:', error)
				}
			}
			blog.image = req.file.path
		}

		await blog.save()
		await blog.populate('categoryId', 'name')

		res.json({blog, message: 'Blog updated successfully'})
	} catch (error) {
		console.error('Error updating blog:', error)
		res.status(500).json({message: error.message || 'Failed to update blog'})
	}
})

router.delete('/:id',isAuthenticated, async (req, res) => {
	try {
		const {id} = req.params

		const blog = await Blog.findById(id)
		if (!blog) {
			return res.status(404).json({message: 'Blog not found'})
		}

		if (blog.image) {
			try {
				const publicId = blog.image.split('/').slice(-2).join('/').split('.')[0]
				await cloudinary.uploader.destroy(`rebuilt-india/blogs/${publicId}`)
			} catch (error) {
				console.error('Error deleting image from Cloudinary:', error)
			}
		}

		await Blog.findByIdAndDelete(id)
		res.status(204).send()
	} catch (error) {
		console.error('Error deleting blog:', error)
		res.status(500).json({message: 'Failed to delete blog'})
	}
})

export default router
