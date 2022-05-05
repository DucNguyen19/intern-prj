"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgDALMongo = void 0;
const org_1 = require("./org");
const mongodb_1 = require("../lib/mongodb");
class OrgDALMongo {
    constructor(db) {
        this.db = db;
        this.col_org = this.db.collection("location");
        this.col_user = this.db.collection("user");
    }
    async init() { }
    async ListOrg() {
        const orgs = await this.col_org.find().toArray();
        return mongodb_1.FromMongoData.Many(orgs);
    }
    async GetOrg(id) {
        const org = await this.col_org.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(org);
    }
    async CreateOrg(org) {
        const doc = mongodb_1.ToMongoData.One(org);
        try {
            await this.col_org.insertOne(doc);
        }
        catch (error) {
            if (error.codes === 11000 /* Duplicate */) {
                throw org_1.OrgNS.Errors.OrgExist;
            }
            else {
                throw error;
            }
        }
    }
    async UpdateOrg(org) {
        const doc = mongodb_1.ToMongoData.One(org);
        try {
            await this.col_org.updateOne({ _id: org.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
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
                throw org_1.OrgNS.Errors.UserExists;
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
exports.OrgDALMongo = OrgDALMongo;
//# sourceMappingURL=org.dal.js.map