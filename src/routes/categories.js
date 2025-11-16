import {Router} from 'express'
import slugify from 'slugify'
import Category from '../models/Category.js'
import isAuthenticated from '../middleware/authmiddleware.js'

const router = Router()

function makeSlug(name) {
	return slugify(name, {lower: true, strict: true, trim: true})
}

router.get('/', isAuthenticated, async (req, res) => {
	try {
		const items = await Category.find({isActive: true}).sort({name: 1}).lean()
		res.json({
			categories: items.map(({_id, name, slug, createdAt}) => ({
				_id,
				name,
				slug,
				createdAt,
			})),
		})
	} catch (err) {
		res.status(500).json({message: 'Server error'})
	}
})

router.post('/',isAuthenticated, async (req, res) => {
	try {
		let {name} = req.body || {}
		if (typeof name !== 'string') {
			return res.status(400).json({message: 'Name is required'})
		}
		name = name.trim().replace(/\s+/g, ' ')
		if (name.length < 1 || name.length > 40) {
			return res
				.status(400)
				.json({message: 'Name must be between 1 and 40 characters'})
		}

		const existing = await Category.findOne({
			name: {$regex: `^${name}$`, $options: 'i'},
		})
		if (existing) {
			return res.status(409).json({message: 'Category already exists'})
		}

		const base = makeSlug(name)
		let candidate = base
		let suffix = 1
		while (await Category.findOne({slug: candidate})) {
			candidate = `${base}-${suffix++}`
		}

		const doc = await Category.create({name, slug: candidate})
		return res.status(201).json({
			category: {
				_id: doc._id,
				name: doc.name,
				slug: doc.slug,
				createdAt: doc.createdAt,
			},
		})
	} catch (err) {
		res.status(500).json({message: 'Server error'})
	}
})

router.delete('/:id', isAuthenticated,async (req, res) => {
	try {
		const {id} = req.params
		const doc = await Category.findByIdAndDelete(id)
		if (!doc) {
			return res.status(404).json({message: 'Category not found'})
		}
		return res.status(204).send()
	} catch (err) {
		res.status(500).json({message: 'Server error'})
	}
})

export default router
