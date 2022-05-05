import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { UserAuthNS } from './auth';
import { NewAuthMiddleware, GetAuthData } from './auth.api.middleware';
import { OrgNS } from "../org/org";

export function NewAuthAPI(
    userAuthBLL: UserAuthNS.BLL,
) {
    const router = express.Router();
    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await userAuthBLL.Login(username, password);
            res.json(session);
        } catch (e) {
            switch (e) {
                case OrgNS.Errors.UserNotFound:
                case UserAuthNS.Errors.ErrWrongPassword:
                case UserAuthNS.Errors.ErrUserHasNoLogin:
                    throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
                default:
                    throw e;
            }
        }
    });

    router.post("/user/set_password", async (req, res) => {
        const user_id = HttpParamValidators.MustBeString(req.body, 'id');
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(user_id, password);
        res.json(1);
    });

    router.use(NewAuthMiddleware(userAuthBLL));
    router.get("/me", async (req, res) => {
        const session = GetAuthData(req);
        try {
            const user = await userAuthBLL.GetUser(session.user_id);
            res.json(user);
        } catch (e) {
            if (e === OrgNS.Errors.UserNotFound) {
                throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
            } else {
                throw e;
            }
        }
    });

    router.get("/me/set_password", async (req, res) => {
        const session = GetAuthData(req);
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await userAuthBLL.SetPassword(session.user_id, password);
        res.json(1);
    });
    
    return router;
}