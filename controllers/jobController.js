import JobModel from "../models/JobModel.js";
import jobModel from "../models/JobModel.js";


// Get all jobs from database
export const getAllJobs = async (req, res) => {
    const jobs = await JobModel.find();
    res.status(200).json({jobs});
}

// Get a job by id from database
export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await JobModel.findById(id);
    if (!job) {
        return res.status(404).json({error: `No job with this id ${id}`});
    }
    res.status(200).json({job});
}

// Create a new job in database
export const createJob = async (req, res) => {
    const job = await JobModel.create(req.body);
    res.status(201).json({job}); // 201: created
}

// Update a job in database
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await jobModel.findByIdAndUpdate(id, req.body,
        {new: true} // new: true means return the updated job
    );
    if (!updatedJob) {
        return res.status(404).json({error: `No job with this id ${id}`});
    }
    res.status(200).json({updatedJob});
}

// Delete a job from database
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const deletedJob = await jobModel.findByIdAndDelete(id);
    if (!deletedJob) {
        return res.status(404).json({error: `No job with this id ${id}`});
    }
    res.status(200).json({deletedJob});
}