"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = errorsHandler;
const http_statuses_1 = require("../core-types/http-statuses");
const ValidationErrors_1 = require("../validation/ValidationErrors");
function errorsHandler(error, res) {
    if (error instanceof Error) {
        const status = http_statuses_1.httpStatus.NotFound;
        res.status(status).send((0, ValidationErrors_1.createErrorMessage)([
            {
                field: error.name,
                message: error.message
            },
        ]));
        return;
    }
    res.status(http_statuses_1.httpStatus.InternalServerError);
    return;
}
