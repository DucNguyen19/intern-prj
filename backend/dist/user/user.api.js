"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUserAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
const user_1 = require("./user");
function NewUserAPI(userBLL) {
    const router = express.Router();
    const role = Object.values(user_1.UserNS.Role);
    router.get('/user/list', async (req, res) => {
        const users = await userBLL.ListUsers();
        res.json(users);
    });
    router.get('/user/get', async (req, res) => {
        if (req.query.id) {
            const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
            const user = await userBLL.GetUser(id);
            return res.json(user);
        }
        if (req.query.username) {
            const username = http_1.HttpParamValidators.MustBeString(req.query, "username", 2);
            console.log(username);
            const user = await userBLL.GetUserByUserName(username);
            return res.json(user);
        }
    });
    router.post('/user/create', async (req, res) => {
        const params = {
            full_name: http_1.HttpParamValidators.MustBeString(req.body, "full_name", 2),
            username: http_1.HttpParamValidators.MustBeString(req.body, "username", 2),
            phone: http_1.HttpParamValidators.MustBeNumber(req.body, "phone", 10),
            role: http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role),
        };
        const user = await userBLL.CreateUser(params);
        res.json(user);
    });
    router.post('/user/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        let params = {};
        if (req.body.full_name) {
            params.full_name = http_1.HttpParamValidators.MustBeString(req.body, "full_name", 2);
        }
        if (req.body.username) {
            params.username = http_1.HttpParamValidators.MustBeString(req.body, "username", 2);
        }
        if (req.body.phone) {
            params.phone = http_1.HttpParamValidators.MustBeNumber(req.body, "phone", 10);
        }
        if (req.body.role) {
            params.role = http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role);
        }
        const user = await userBLL.UpdateUser(id, params);
        res.json(user);
    });
    router.post('/user/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const user = await userBLL.DeleteUser(id);
        res.json(user);
    });
    return router;
}
exports.NewUserAPI = NewUserAPI;
//# sourceMappingURL=user.api.js.map