import {Request, Response, NextFunction} from "express";
import {UnauthenticatedError} from "../errors/unauthenticated";
import jwt, {JwtPayload} from 'jsonwebtoken';

export interface CustomRequest extends Request {
    token?: string | JwtPayload;
    user: object;
}

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }

    try {
        const token: string = authHeader.split(' ')[1]
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username}: { id: string, username: string } = decoded;

        (req as CustomRequest).user = {id, username};
        (req as CustomRequest).token = decoded;
        next()
    } catch (error) {
        throw  new UnauthenticatedError('Not authorized to access this route')
    }

}

export default authenticationMiddleware;