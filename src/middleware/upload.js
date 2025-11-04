import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, '../../uploads/blogs')
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, {recursive: true})
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadsDir)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname))
	},
})

const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png|webp|gif/
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimetype = allowedTypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		cb(new Error('Only image files are allowed (jpeg, jpg, png, webp, gif)'))
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
