import mongoose from 'mongoose'
import dotenv from 'dotenv'
import slugify from 'slugify'
import Category from './models/Category.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

async function ensureSlugUnique(base) {
	let candidate = base
	let suffix = 1
	// eslint-disable-next-line no-constant-condition
	while (await Category.findOne({slug: candidate})) {
		candidate = `${base}-${suffix++}`
	}
	return candidate
}

async function run() {
	if (!MONGODB_URI) {
		console.error('Missing MONGODB_URI')
		process.exit(1)
	}

	await mongoose.connect(MONGODB_URI)

	const names = ['Tech', 'Travel', 'Health', 'Fashion', 'Sports']
	for (const name of names) {
		const exists = await Category.findOne({
			name: {$regex: `^${name}$`, $options: 'i'},
		})
		if (!exists) {
			const base = slugify(name, {lower: true, strict: true, trim: true})
			const slug = await ensureSlugUnique(base)
			await Category.create({name, slug})
		}
	}

	console.log('Seed complete')
	process.exit(0)
}

run().catch((err) => {
	console.error(err)
	process.exit(1)
})
