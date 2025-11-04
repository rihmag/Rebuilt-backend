import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
	{
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 200,
		},
		description: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 5000,
		},
		image: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 100,
		},
		date: {
			type: Date,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{timestamps: true}
)

export default mongoose.model('Blog', BlogSchema)
