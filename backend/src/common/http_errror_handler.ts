import { HttpError, HttpStatusCodes } from "../lib/http";
import { TodoNS } from "../todo/todo";
import {InternNS} from '../intern/intern'
import { UserAuthNS } from "../auth/auth";
import { OrgNS } from "../org/org";
const commonErrors = new Set([
   ...Object.values(TodoNS.Errors),
   ...Object.values(InternNS.Errors),
   ...Object.values(UserAuthNS.Errors),
   ...Object.values(OrgNS.Errors),
]);

export function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new HttpError(err.message, HttpStatusCodes.BadRequest);
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