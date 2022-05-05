"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternDALMongo = void 0;
const mongodb_1 = require("../lib/mongodb");
const intern_1 = require("./intern");
class InternDALMongo {
    constructor(db) {
        this.db = db;
        this.col_intern = this.db.collection("intern");
        this.col_contact = this.db.collection("contact");
    }
    async init() {
        // danh index
    }
    async ListInterns() {
        const interns = await this.col_intern.find().toArray();
        return mongodb_1.FromMongoData.Many(interns);
    }
    async GetIntern(id) {
        const intern = await this.col_intern.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(intern);
    }
    async GetInternByCccd(cccd) {
        const intern = await this.col_intern.findOne({ cccd: cccd });
        return mongodb_1.FromMongoData.One(intern);
    }
    async GetInternByUserID(user_id) {
        const interns = await this.col_intern.find({ createdBy: user_id }).toArray();
        return mongodb_1.FromMongoData.Many(interns);
    }
    async CreateIntern(intern) {
        const doc = mongodb_1.ToMongoData.One(intern);
        try {
            await this.col_intern.insertOne(doc);
        }
        catch (error) {
            if (error.codes === 11000 /* Duplicate */) {
                throw intern_1.InternNS.Errors.InternExist;
            }
            else {
                throw error;
            }
        }
    }
    async UpdateIntern(intern) {
        const doc = mongodb_1.ToMongoData.One(intern);
        try {
            await this.col_intern.updateOne({ _id: intern.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteIntern(intern) {
        await this.UpdateIntern(intern);
    }
    //contact
    async ListContacts(intern_id) {
        const contacts = await this.col_contact.find({ intern_id }).toArray();
        return mongodb_1.FromMongoData.Many(contacts);
    }
    async GetContact(id) {
        const contact = await this.col_contact.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(contact);
    }
    async CreateContact(contact) {
        const doc = mongodb_1.ToMongoData.One(contact);
        try {
            await this.col_contact.insertOne(doc);
        }
        catch (error) {
            if (error.codes === 11000 /* Duplicate */) {
                throw intern_1.InternNS.Errors.ContactExists;
            }
            else {
                throw error;
            }
        }
    }
    async UpdateContact(contact) {
        const updateContact = mongodb_1.ToMongoData.One(contact);
        try {
            await this.col_contact.updateOne({ _id: contact.id }, { $set: updateContact });
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteContact(contacts) {
        for (const contact of contacts) {
            await this.UpdateContact(contact);
        }
    }
}
exports.InternDALMongo = InternDALMongo;
//# sourceMappingURL=intern.dal.js.map