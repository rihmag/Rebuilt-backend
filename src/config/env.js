import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
	PORT: process.env.PORT || 4000,
	MONGODB_URI: process.env.MONGODB_URI,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
	CORS_ORIGIN: process.env.CORS_ORIGIN,
}

if (!ENV.MONGODB_URI) {
	console.error('Missing MONGODB_URI in .env file')
	process.exit(1)
}

if (
	!ENV.CLOUDINARY_CLOUD_NAME ||
	!ENV.CLOUDINARY_API_KEY ||
	!ENV.CLOUDINARY_API_SECRET
) {
	console.error('Missing Cloudinary credentials in .env file:')
	console.error('CLOUDINARY_CLOUD_NAME:', ENV.CLOUDINARY_CLOUD_NAME ? '✓' : '✗')
	console.error('CLOUDINARY_API_KEY:', ENV.CLOUDINARY_API_KEY ? '✓' : '✗')
	console.error('CLOUDINARY_API_SECRET:', ENV.CLOUDINARY_API_SECRET ? '✓' : '✗')
	process.exit(1)
}

console.log('Environment variables loaded successfully')
