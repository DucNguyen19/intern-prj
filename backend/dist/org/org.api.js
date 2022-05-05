"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOrgAPI = void 0;
const express = require("express");
const org_1 = require("./org");
const http_1 = require("../lib/http");
function NewOrgAPI(orgBLL) {
    const router = express.Router();
    const role = Object.values(org_1.OrgNS.Role);
    router.get('/org/list', async (req, res) => {
        const orgs = await orgBLL.ListOrg();
        res.json(orgs);
    });
    router.get('/org/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 4);
        const org = await orgBLL.GetOrg(id);
        res.json(org);
    });
    router.post('/org/create', async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
            code: http_1.HttpParamValidators.MustBeString(req.body, "code", 2)
        };
        const org = await orgBLL.CreateOrg(params);
        res.json(org);
    });
    router.post('/org/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 4);
        const params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
        }
        if (req.body.code) {
            params.code = http_1.HttpParamValidators.MustBeString(req.body, "code", 2);
        }
        const org = await orgBLL.UpdateOrg(id, params);
        res.json(org);
    });
    router.get('/user/list', async (req, res) => {
        const users = await orgBLL.ListUsers();
        res.json(users);
    });
    router.get('/user/get', async (req, res) => {
        let doc;
        if (req.query.id) {
            const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
            doc = await orgBLL.GetUser(id);
        }
        if (req.query.username) {
            const username = http_1.HttpParamValidators.MustBeString(req.query, "username", 2);
            const user = await orgBLL.GetUserByUserName(username);
            return res.json(user);
        }
        res.json(doc);
    });
    router.post('/user/create', async (req, res) => {
        const params = {
            full_name: http_1.HttpParamValidators.MustBeString(req.body, "full_name", 2),
            username: http_1.HttpParamValidators.MustBeString(req.body, "username", 2),
            phone: http_1.HttpParamValidators.MustBeNumber(req.body, "phone", 10),
            role: http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role),
            org_id: http_1.HttpParamValidators.MustBeString(req.body, "org_id", 4)
        };
        const user = await orgBLL.CreateUser(params);
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
        if (req.body.org_id) {
            params.org_id = http_1.HttpParamValidators.MustBeString(req.body, "org_id", 4);
        }
        const user = await orgBLL.UpdateUser(id, params);
        res.json(user);
    });
    router.post('/user/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        await orgBLL.DeleteUser(id);
        res.json(1);
    });
    return router;
}
exports.NewOrgAPI = NewOrgAPI;
//# sourceMappingURL=org.api.js.map