"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTodoAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
function NewTodoAPI(todoBLL) {
    const router = express.Router();
    router.get("/todo/list", async (req, res) => {
        const docs = await todoBLL.ListTodo();
        res.json(docs);
    });
    router.get("/todo/get", async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const doc = await todoBLL.GetTodo(id);
        res.json(doc);
    });
    router.post("/todo/create", async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2)
        };
        const doc = await todoBLL.CreateTodo(params);
        res.json(doc);
    });
    router.post("/todo/update", async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        let params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
        }
        const doc = await todoBLL.UpdateTodo(id, params);
        res.json(doc);
    });
    return router;
}
exports.NewTodoAPI = NewTodoAPI;
//# sourceMappingURL=todo.api.js.map