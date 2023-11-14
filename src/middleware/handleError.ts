import {NextFunction, Request, Response} from "express";

export default function handleError({message, statusCode}, req: Request, res: Response, next: NextFunction):void {
    res.status(statusCode || 500).send({message: message})
}
