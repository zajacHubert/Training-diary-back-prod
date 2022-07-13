"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
;
const handleError = (err, req, res, next) => {
    console.log(err);
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
        message: err instanceof ValidationError ? err.message : 'Sorry, please again later',
    });
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map