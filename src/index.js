import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {ENV} from './config/env.js'
import categoriesRouter from './routes/categories.js'
import blogsRouter from './routes/blogs.js'
import mainStoriesRouter from './routes/mainStories.js'
import trendingStoriesRouter from './routes/trendingStories.js'

const app = express()

// CORS configuration for production
const corsOptions = {
	origin: ENV.CORS_ORIGIN || '*',
	credentials: true,
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/api/health', (req, res) => {
	res.json({ok: true})
})

app.use('/api/categories', categoriesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/main-stories', mainStoriesRouter)
app.use('/api/trending-stories', trendingStoriesRouter)

mongoose
	.connect(ENV.MONGODB_URI)
	.then(() => {
		app.listen(ENV.PORT, () => {
			console.log(`API listening on http://localhost:${ENV.PORT}`)
		})
	})
	.catch((err) => {
		console.error('Mongo connection error', err)
		process.exit(1)
	})
