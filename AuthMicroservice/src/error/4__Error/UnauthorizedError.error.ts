import AppError from "../ApiError";

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401, "UnauthorizedError");
    }
}