import Job from "../models/JobModel.js";
import {StatusCodes} from "http-status-codes";


// Get all jobs from database
export const getAllJobs = async (req, res) => {
    // console.log(req.user);
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs});
}

// Get a job by id from database
export const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({job});
}

// Create a new job in database
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

// Update a job in database
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body,
        {new: true} // new: true means return the updated job
    );
    res.status(StatusCodes.OK).json({updatedJob});
}

// Delete a job from database
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({deletedJob});
}