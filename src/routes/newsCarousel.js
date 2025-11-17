import express from 'express'
import NewsCarousel from '../models/NewsCarousel.js'
import upload, {cloudinary} from '../middleware/cloudinaryUpload.js'
import isAuthenticated from '../middleware/authmiddleware.js'
const router = express.Router()

// Get all news carousel items
router.get('/getnews', async (req, res) => {
	try {
		const items = await NewsCarousel.find({isActive: true}).sort({createdAt: -1})
		res.json({newsCarousel: items})
	} catch (error) {
		console.error('Error fetching news carousel:', error)
		res.status(500).json({message: 'Failed to fetch news carousel'})
	}
})

// Create a new news carousel item
router.post('/createnews',isAuthenticated,upload.single('image'), async (req, res) => {
	try {
		const {headline} = req.body

		if (!headline) {
			return res.status(400).json({message: 'Headline is required'})
		}

		if (!req.file) {
			return res.status(400).json({message: 'Image is required'})
		}

		if (headline.trim().length < 1 || headline.trim().length > 200) {
			return res
				.status(400)
				.json({message: 'Headline must be between 1 and 200 characters'})
		}

		const imageUrl = req.file.path

		const newsItem = new NewsCarousel({
			headline: headline.trim(),
			image: imageUrl,
		})

		await newsItem.save()

		res.status(201).json({newsCarousel: newsItem, message: 'Successfully Added'})
	} catch (error) {
		console.error('Error creating news carousel item:', error)
		res
			.status(500)
			.json({message: error.message || 'Failed to create news carousel item'})
	}
})

// Delete a news carousel item
router.delete('/:id',isAuthenticated, async (req, res) => {
	try {
		const {id} = req.params

		const newsItem = await NewsCarousel.findById(id)
		if (!newsItem) {
			return res.status(404).json({message: 'News carousel item not found'})
		}

		// Delete image from Cloudinary
		if (newsItem.image) {
			try {
				const publicId = newsItem.image
					.split('/')
					.slice(-2)
					.join('/')
					.split('.')[0]
				await cloudinary.uploader.destroy(`rebuilt-india/blogs/${publicId}`)
			} catch (error) {
				console.error('Error deleting image from Cloudinary:', error)
			}
		}

		await NewsCarousel.findByIdAndDelete(id)
		res.status(204).send()
	} catch (error) {
		console.error('Error deleting news carousel item:', error)
		res.status(500).json({message: 'Failed to delete news carousel item'})
	}
})

export default router
