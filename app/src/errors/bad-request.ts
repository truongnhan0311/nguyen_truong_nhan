import {CustomAPIError} from './custom-error'
import {StatusCodes} from 'http-status-codes';

class BadRequest extends CustomAPIError {
    statusCode: number;

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest