import express from 'express'
import MainStory from '../models/MainStory.js'
import Blog from '../models/Blog.js'
import isAuthenticated from '../middleware/authmiddleware.js'
const router = express.Router()

// Get all main stories
router.get('/getstories', async (req, res) => {
	try {
		const mainStories = await MainStory.find()
			.populate({
				path: 'blogId',
				populate: {path: 'categoryId'},
			})
			.sort({createdAt: -1})

		// Extract the blog data from the populated blogId
		const blogs = mainStories
			.map((ms) => ms.blogId)
			.filter((blog) => blog !== null)

		res.json({mainStories: blogs})
	} catch (error) {
		console.error('Error fetching main stories:', error)
		res.status(500).json({message: 'Failed to fetch main stories'})
	}
})

// Add blog to main stories
router.post('/createstories', isAuthenticated,async (req, res) => {
	try {
		const {blogId} = req.body

		if (!blogId) {
			return res.status(400).json({message: 'Blog ID is required'})
		}

		// Check if blog exists
		const blog = await Blog.findById(blogId)
		if (!blog) {
			return res.status(404).json({message: 'Blog not found'})
		}

		// Check if already in main stories
		const existing = await MainStory.findOne({blogId})
		if (existing) {
			return res.status(400).json({message: 'Blog is already in main stories'})
		}

		const mainStory = new MainStory({blogId})
		await mainStory.save()

		res.status(201).json({message: 'Added to main stories', mainStory})
	} catch (error) {
		console.error('Error adding to main stories:', error)
		res.status(500).json({message: 'Failed to add to main stories'})
	}
})

// Remove blog from main stories
router.delete('removefromstories/:blogId',isAuthenticated, async (req, res) => {
	try {
		const {blogId} = req.params

		const result = await MainStory.findOneAndDelete({blogId})

		if (!result) {
			return res.status(404).json({message: 'Blog not found in main stories'})
		}

		res.status(204).send()
	} catch (error) {
		console.error('Error removing from main stories:', error)
		res.status(500).json({message: 'Failed to remove from main stories'})
	}
})

export default router
