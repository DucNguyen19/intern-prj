"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDALMongo = void 0;
const mongodb_1 = require("../lib/mongodb");
const todo_1 = require("./todo");
class TodoDALMongo {
    constructor(db) {
        this.db = db;
        this.col_todo = this.db.collection("todo");
    }
    async init() { }
    async ListTodo() {
        const docs = await this.col_todo.find().toArray();
        return mongodb_1.FromMongoData.Many(docs);
    }
    async GetTodo(id) {
        const doc = await this.col_todo.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(doc);
    }
    async CreateTodo(todo) {
        const doc = mongodb_1.ToMongoData.One(todo);
        try {
            await this.col_todo.insertOne(doc);
        }
        catch (e) {
            if (e.codes === 11000 /* Duplicate */) {
                throw todo_1.TodoNS.Errors.TodoExist;
            }
            else {
                throw e;
            }
        }
    }
    async UpdateTodo(todo) {
        const doc = mongodb_1.ToMongoData.One(todo);
        try {
            await this.col_todo.updateOne({ _id: todo.id }, { $set: doc });
        }
        catch (e) {
            throw e;
        }
    }
}
exports.TodoDALMongo = TodoDALMongo;
//# sourceMappingURL=todo.dal.js.map