import CustomAPIError from "./custom-error";
import {StatusCodes} from "http-status-codes";

export class UnauthenticatedError extends CustomAPIError {
    statusCode: number
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
