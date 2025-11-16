import express from 'express'
import TrendingStory from '../models/TrendingStory.js'
import Blog from '../models/Blog.js'
import isAuthenticated from '../middleware/authmiddleware.js'
const router = express.Router()

// Get all trending stories
router.get('/', async (req, res) => {
	try {
		const trendingStories = await TrendingStory.find()
			.populate({
				path: 'blogId',
				populate: {path: 'categoryId'},
			})
			.sort({createdAt: -1})

		// Extract the blog data from the populated blogId
		const blogs = trendingStories
			.map((ts) => ts.blogId)
			.filter((blog) => blog !== null)

		res.json({trendingStories: blogs})
	} catch (error) {
		console.error('Error fetching trending stories:', error)
		res.status(500).json({message: 'Failed to fetch trending stories'})
	}
})

// Add blog to trending stories
router.post('/',isAuthenticated, async (req, res) => {
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

		// Check if already in trending stories
		const existing = await TrendingStory.findOne({blogId})
		if (existing) {
			return res
				.status(400)
				.json({message: 'Blog is already in trending stories'})
		}

		const trendingStory = new TrendingStory({blogId})
		await trendingStory.save()

		res.status(201).json({message: 'Added to trending stories', trendingStory})
	} catch (error) {
		console.error('Error adding to trending stories:', error)
		res.status(500).json({message: 'Failed to add to trending stories'})
	}
})

// Remove blog from trending stories
router.delete('/:blogId', isAuthenticated,async (req, res) => {
	try {
		const {blogId} = req.params

		const result = await TrendingStory.findOneAndDelete({blogId})

		if (!result) {
			return res
				.status(404)
				.json({message: 'Blog not found in trending stories'})
		}

		res.status(204).send()
	} catch (error) {
		console.error('Error removing from trending stories:', error)
		res.status(500).json({message: 'Failed to remove from trending stories'})
	}
})

export default router
