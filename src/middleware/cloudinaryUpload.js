import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import {ENV} from '../config/env.js'

cloudinary.config({
	cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
	api_key: ENV.CLOUDINARY_API_KEY,
	api_secret: ENV.CLOUDINARY_API_SECRET,
})

console.log('Cloudinary configured successfully')

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'rebuilt-india/blogs',
		allowed_formats: [
			'jpg',
			'jpeg',
			'png',
			'webp',
			'gif',
			'avif',
			'bmp',
			'tiff',
			'tif',
			'svg',
			'ico',
			'heic',
			'heif',
		],
		transformation: [{width: 1200, height: 800, crop: 'limit'}],
	},
})

const fileFilter = (req, file, cb) => {
	const allowedTypes =
		/jpeg|jpg|png|webp|gif|avif|bmp|tiff|tif|svg|ico|heic|heif/
	const mimetype = allowedTypes.test(file.mimetype)

	if (mimetype) {
		return cb(null, true)
	} else {
		cb(
			new Error(
				'Only image files are allowed (jpeg, jpg, png, webp, gif, avif, bmp, tiff, svg, ico, heic, heif)'
			)
		)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
	fileFilter: fileFilter,
})

export default upload
export {cloudinary}
