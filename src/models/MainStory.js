import mongoose from 'mongoose'

const MainStorySchema = new mongoose.Schema(
	{
		blogId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
			required: true,
			unique: true,
		},
	},
	{timestamps: true}
)

export default mongoose.model('MainStory', MainStorySchema)
