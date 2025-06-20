import { Response } from 'express';
import {httpStatus} from "../core-types/http-statuses";
import {createErrorMessage} from "../validation/ValidationErrors";

export function errorsHandler(error: unknown, res: Response): void {
    if (error instanceof Error) {
        const status = httpStatus.NotFound;

        res.status(status).send(
            createErrorMessage([
                {
                    field: error.name,
                    message: error.message
                },
            ]),
        );

        return;
    }
    res.status(httpStatus.InternalServerError);
    return
}
