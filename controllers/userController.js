import User from '../models/UserModel.js';
import {StatusCodes} from "http-status-codes";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
    let user = await User.findById(req.user.userId);
    // remove password from user object
    const userWithOutPassword = user.toJSON();

    res.status(StatusCodes.OK).json({ user: userWithOutPassword });
}

export const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    res.status(StatusCodes.OK).json({ msg: 'user updated' });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
};