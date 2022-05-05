"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoBLLBase = void 0;
const todo_1 = require("./todo");
class TodoBLLBase {
    constructor(dal) {
        this.dal = dal;
    }
    async init() { }
    async ListTodo() {
        const docs = await this.dal.ListTodo();
        return docs;
    }
    async GetTodo(id) {
        const doc = await this.dal.GetTodo(id);
        if (!doc) {
            throw todo_1.TodoNS.Errors.TodoNotFound;
        }
        return doc;
    }
    async CreateTodo(params) {
        const todo = {
            id: todo_1.TodoNS.Generator.NewTodoID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateTodo(todo);
        return todo;
    }
    async UpdateTodo(id, params) {
        const todo = await this.GetTodo(id);
        const doc = { ...todo, ...params };
        await this.dal.UpdateTodo(doc);
        return doc;
    }
}
exports.TodoBLLBase = TodoBLLBase;
//# sourceMappingURL=todo.bll.js.map