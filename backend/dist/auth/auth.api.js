"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAuthAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
const auth_1 = require("./auth");
const auth_api_middleware_1 = require("./auth.api.middleware");
const org_1 = require("../org/org");
function NewAuthAPI(userAuthBLL) {
    const router = express.Router();
    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await userAuthBLL.Login(username, password);
            res.json(session);
        }
        catch (e) {
            switch (e) {
                case org_1.OrgNS.Errors.UserNotFound:
                case auth_1.UserAuthNS.Errors.ErrWrongPassword:
                case auth_1.UserAuthNS.Errors.ErrUserHasNoLogin:
                    throw new http_1.HttpError(e.message, 401 /* Unauthorized */);
                default:
                    throw e;
            }
        }
    });
    router.post("/user/set_password", async (req, res) => {
        const user_id = http_1.HttpParamValidators.MustBeString(req.body, 'id');
        const password = http_1.HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(user_id, password);
        res.json(1);
    });
    router.use((0, auth_api_middleware_1.NewAuthMiddleware)(userAuthBLL));
    router.get("/me", async (req, res) => {
        const session = (0, auth_api_middleware_1.GetAuthData)(req);
        try {
            const user = await userAuthBLL.GetUser(session.user_id);
            res.json(user);
        }
        catch (e) {
            if (e === org_1.OrgNS.Errors.UserNotFound) {
                throw new http_1.HttpError(e.message, 401 /* Unauthorized */);
            }
            else {
                throw e;
            }
        }
    });
    router.get("/me/set_password", async (req, res) => {
        const session = (0, auth_api_middleware_1.GetAuthData)(req);
        const password = http_1.HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(session.user_id, password);
        res.json(1);
    });
    return router;
}
exports.NewAuthAPI = NewAuthAPI;
//# sourceMappingURL=auth.api.js.map