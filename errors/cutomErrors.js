import { StatusCodes } from 'http-status-codes';

// Custom error for not found error (404)
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

// Custom error for bad request error (400)
export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

// Custom error for unauthenticated error (401)
export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthenticatedError';
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

// Custom error for unauthorized error (403)
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

// Custom error for conflict error (409)
export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = StatusCodes.CONFLICT;
    }
}

// Custom error for too many requests error (429)
export class TooManyRequestsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TooManyRequestsError';
        this.statusCode = StatusCodes.TOO_MANY_REQUESTS;
    }
}

