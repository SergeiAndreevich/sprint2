"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
const errorsHandler_helper_1 = require("../core/helpers/errorsHandler.helper");
const authHandler = (req, res) => {
    try {
    }
    catch (e) {
        (0, errorsHandler_helper_1.errorsHandler)(e, res);
    }
};
exports.authHandler = authHandler;
