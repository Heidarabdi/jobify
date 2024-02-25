
import { verifyJWT } from '../utils/tokenUtils.js';
import {BadRequestError, UnauthenticatedError, UnauthorizedError} from "../errors/cutomErrors.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }

    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === '65da2fc7c9bdb4d9b3cba780';
        req.user = { userId, role, testUser};
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid');
    }

};


export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};