"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgBLLBase = void 0;
const filter_data_handlers_1 = require("../common/filter_data_handlers");
const org_1 = require("./org");
class OrgBLLBase {
    constructor(dal) {
        this.dal = dal;
    }
    async init() { }
    async ListOrg() {
        const orgs = await this.dal.ListOrg();
        return orgs;
    }
    async GetOrg(id) {
        const org = await this.dal.GetOrg(id);
        if (!org) {
            throw org_1.OrgNS.Errors.OrgNotFound;
        }
        return org;
    }
    async CreateOrg(params) {
        const org = {
            id: org_1.OrgNS.Generator.NewOrgID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateOrg(org);
        return org;
    }
    async UpdateOrg(id, params) {
        const org = await this.GetOrg(id);
        const doc = {
            ...org, ...params, mtime: Date.now()
        };
        await this.dal.UpdateOrg(doc);
        return doc;
    }
    async ListUsers() {
        const users = await this.dal.ListUsers();
        const viewUserArr = [];
        for (const user of (0, filter_data_handlers_1.FilterData)(users)) {
            const viewUser = await this.GetUser(user.id);
            viewUserArr.push(viewUser);
        }
        return viewUserArr;
    }
    async GetUser(id) {
        const user = await this.dal.GetUser(id);
        if ((0, filter_data_handlers_1.FilterData)([user]).length === +0) {
            throw org_1.OrgNS.Errors.UserNotFound;
        }
        const org = await this.GetOrg(user.org_id);
        const viewUser = {
            ...user,
            org: org
        };
        return viewUser;
    }
    async GetUserByUserName(name) {
        const user = await this.dal.GetUserByUserName(name);
        if ((0, filter_data_handlers_1.FilterData)([user]).length === +0) {
            throw org_1.OrgNS.Errors.UserNotFound;
        }
        const org = await this.GetOrg(user.org_id);
        const viewUser = {
            ...user,
            org: org
        };
        return viewUser;
    }
    async CreateUser(params) {
        const user = {
            id: org_1.OrgNS.Generator.NewUserID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        const org = await this.GetOrg(params.org_id);
        await this.dal.CreateUser(user);
        return { ...user, org: org };
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
        const user = await this.dal.GetUser(id);
        if (!user || (0, filter_data_handlers_1.FilterData)([user]).length === +0) {
            throw org_1.OrgNS.Errors.UserNotFound;
        }
        const doc = {
            ...user, dtime: Date.now()
        };
        await this.dal.UpdateUser(doc);
        return doc;
    }
}
exports.OrgBLLBase = OrgBLLBase;
//# sourceMappingURL=org.bll.js.map