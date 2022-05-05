"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewInternAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
function NewInternAPI(internBLL) {
    const router = express.Router();
    router.get('/intern/list', async (req, res) => {
        const interns = await internBLL.ListInterns();
        res.json(interns);
    });
    router.get('/intern/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const intern = await internBLL.GetIntern(id);
        res.json(intern);
    });
    router.post('/intern/create', async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
            birthday: http_1.HttpParamValidators.MustBeString(req.body, "birthday", 10),
            cccd: http_1.HttpParamValidators.MustBeString(req.body, "cccd", 8),
            createdBy: http_1.HttpParamValidators.MustBeString(req.body, "createdBy", 8),
        };
        const intern = await internBLL.CreateIntern(params);
        res.json(intern);
    });
    router.post('/intern/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, 'name', 2);
        }
        if (req.body.createdBy) {
            params.createdBy = http_1.HttpParamValidators.MustBeString(req.body, 'createdBy', 8);
        }
        if (req.body.birthday) {
            params.birthday = http_1.HttpParamValidators.MustBeString(req.body, "birthday", 10);
        }
        if (req.body.cccd) {
            params.cccd = http_1.HttpParamValidators.MustBeString(req.body, "cccd", 8);
        }
        const intern = await internBLL.UpdateIntern(id, params);
        res.json(intern);
    });
    router.post('/intern/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const result = await internBLL.DeleteIntern(id);
        res.json(result);
    });
    //contact
    router.get('/contact/list', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "intern_id", 8);
        const contacts = await internBLL.ListContacts(id);
        res.json(contacts);
    });
    router.get('/contact/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const contact = await internBLL.GetContact(id);
        res.json(contact);
    });
    router.post('/contact/create', async (req, res) => {
        const params = {
            intern_id: http_1.HttpParamValidators.MustBeString(req.body, "intern_id", 8),
            region: http_1.HttpParamValidators.MustBeString(req.body, "region", 3),
            phone: http_1.HttpParamValidators.MustBeNumber(req.body, "phone", 10),
            school: http_1.HttpParamValidators.MustBeString(req.body, "school", 3),
            link_fb: http_1.HttpParamValidators.MustBeString(req.body, "link_fb", 2),
            skill: req.body.skill
        };
        const contact = await internBLL.CreateContact(params);
        res.json(contact);
    });
    router.post('/contact/update', async (req, res) => {
        const intern_id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const params = {};
        if (req.body.region) {
            params.region = http_1.HttpParamValidators.MustBeString(req.body, "region", 3);
        }
        if (req.body.phone) {
            params.phone = http_1.HttpParamValidators.MustBeNumber(req.body, "phone", 10);
        }
        if (req.body.school) {
            params.school = http_1.HttpParamValidators.MustBeString(req.body, "school", 3);
        }
        if (req.body.link_fb) {
            params.link_fb = http_1.HttpParamValidators.MustBeString(req.body, "link_fb", 2);
        }
        if (req.body.skill) {
            params.skill = req.body.skill;
        }
        const contact = await internBLL.UpdateContact(intern_id, params);
        res.json(contact);
    });
    router.post('/contact/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        // const result=await internBLL.DeleteContact(id)
        // res.json(result)
    });
    return router;
}
exports.NewInternAPI = NewInternAPI;
//# sourceMappingURL=intern.api.js.map