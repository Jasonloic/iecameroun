"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message = 'Succès', statusCode = 200, meta) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta ? { meta } : {}),
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500, errors) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors ? { errors } : {}),
    });
};
exports.sendError = sendError;
//# sourceMappingURL=apiResponse.js.map