"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBLLBase = void 0;
const user_1 = require("./user");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
class UserBLLBase {
    constructor(dal) {
        this.dal = dal;
    }
    async init() { }
    async ListUsers() {
        const users = await this.dal.ListUsers();
        return users;
    }
    async GetUser(id) {
        const user = await this.dal.GetUser(id);
        if ((0, filter_data_handlers_1.FilterData)([user]).length == 0) {
            throw user_1.UserNS.Errors.UserNotFound;
        }
        return user;
    }
    async GetUserByUserName(name) {
        const user = await this.dal.GetUserByUserName(name);
        if ((0, filter_data_handlers_1.FilterData)([user]).length == 0) {
            throw user_1.UserNS.Errors.UserNotFound;
        }
        return user;
    }
    async CreateUser(params) {
        const user = {
            id: user_1.UserNS.Generator.NewUserID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateUser(user);
        return user;
    }
    async UpdateUser(id, params) {
        const user = await this.GetUser(id);
        const doc = {
            ...user, ...params, mtime: Date.now()
        };
        await this.dal.UpdateUser(doc);
        return doc;
    }
    async DeleteUser(id) {
        const user = await this.GetUser(id);
        const doc = {
            ...user, dtime: Date.now()
        };
        await this.dal.DeleteUser(doc);
        return doc;
    }
}
exports.UserBLLBase = UserBLLBase;
//# sourceMappingURL=user.bll.js.map