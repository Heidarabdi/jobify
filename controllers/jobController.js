import Job from "../models/JobModel.js";
import {StatusCodes} from "http-status-codes";
import day from "dayjs";
import mongoose from "mongoose";


// Get all jobs from database
export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject = {
        createdBy: req.user.userId,
    };

    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
    }
    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
        .sort(sortKey)
        .skip(skip)
        .limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res
        .status(StatusCodes.OK)
        .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

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

export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, count };
        })
        .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};