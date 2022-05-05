"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDALMongo = void 0;
const mongodb_1 = require("../lib/mongodb");
const user_1 = require("./user");
class UserDALMongo {
    constructor(db) {
        this.db = db;
        this.col_user = this.db.collection("user");
    }
    async init() { }
    async ListUsers() {
        const users = await this.col_user.find().toArray();
        return mongodb_1.FromMongoData.Many(users);
    }
    async GetUser(id) {
        const user = await this.col_user.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(user);
    }
    async GetUserByUserName(name) {
        const user = await this.col_user.findOne({ username: name });
        return mongodb_1.FromMongoData.One(user);
    }
    async CreateUser(user) {
        const doc = mongodb_1.ToMongoData.One(user);
        try {
            await this.col_user.insertOne(doc);
        }
        catch (e) {
            if (e.codes === 11000 /* Duplicate */) {
                throw user_1.UserNS.Errors.UserExists;
            }
            else {
                throw e;
            }
        }
    }
    async UpdateUser(user) {
        const doc = mongodb_1.ToMongoData.One(user);
        try {
            await this.col_user.updateOne({ _id: user.id }, { $set: doc });
        }
        catch (e) {
            throw e;
        }
    }
    async DeleteUser(user) {
        await this.UpdateUser(user);
    }
}
exports.UserDALMongo = UserDALMongo;
//# sourceMappingURL=user.dal.js.map