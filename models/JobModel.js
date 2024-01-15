import mongoose from 'mongoose';


const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    JobStatus: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    JobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        default: 'full-time'
    },
    JobLocation: {
        type: String,
        default: 'My City'
    },
}, {timestamps: true}); // timestamps: true adds createdAt and updatedAt fields

export default mongoose.model('Job', JobSchema);