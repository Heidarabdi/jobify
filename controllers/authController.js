import {comparePassword, hashPassword} from "../utils/passwordUtils.js";
import User from "../models/UserModel.js";
import {StatusCodes} from "http-status-codes";
import {UnauthenticatedError} from "../errors/cutomErrors.js";
import {createJWT} from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    // if user is the first user, make the user an admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    req.body.role = isFirstUser ? 'admin' : 'user';
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg : "user created successfully", user});
}

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new UnauthenticatedError('invalid email or password');
    const isPasswordValid = await comparePassword(req.body.password, user.password);
    if (!isPasswordValid) throw new UnauthenticatedError('invalid email or password');

    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24; // 24 hours

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });

    // console.log(user);
    // console.log(user._id);

    res.status(StatusCodes.OK).json({msg: "login successful", user});
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({msg: "logout successful"});
}