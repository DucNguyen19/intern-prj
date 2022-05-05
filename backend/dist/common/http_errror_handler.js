"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
const http_1 = require("../lib/http");
const todo_1 = require("../todo/todo");
const intern_1 = require("../intern/intern");
const auth_1 = require("../auth/auth");
const org_1 = require("../org/org");
const commonErrors = new Set([
    ...Object.values(todo_1.TodoNS.Errors),
    ...Object.values(intern_1.InternNS.Errors),
    ...Object.values(auth_1.UserAuthNS.Errors),
    ...Object.values(org_1.OrgNS.Errors),
]);
function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new http_1.HttpError(err.message, 400 /* BadRequest */);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        const message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message,
        });
        return;
    }
    console.log(err);
    res.status(500).send({
        error: "internal server error",
    });
}
exports.HttpErrorHandler = HttpErrorHandler;
//# sourceMappingURL=http_errror_handler.js.map