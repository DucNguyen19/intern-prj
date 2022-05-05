"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternBLLBase = void 0;
const intern_1 = require("./intern");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
class InternBLLBase {
    constructor(dal) {
        this.dal = dal;
    }
    async init() { }
    //contact
    async ListContacts(intern_id) {
        const contacts = await this.dal.ListContacts(intern_id);
        return (0, filter_data_handlers_1.FilterData)(contacts);
    }
    async GetContact(id) {
        const contact = await this.dal.GetContact(id);
        if (!contact || (0, filter_data_handlers_1.FilterData)([contact]).length == 0) {
            throw intern_1.InternNS.Errors.ContactNotFound;
        }
        return contact;
    }
    async CreateContact(params) {
        const contact = {
            id: intern_1.InternNS.Generator.NewInternID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now(),
        };
        await this.dal.CreateContact(contact);
        return contact;
    }
    async UpdateContact(id, params) {
        const contact = await this.GetContact(id);
        if ((0, filter_data_handlers_1.FilterData)([contact]).length == 0) {
            throw intern_1.InternNS.Errors.ContactNotFound;
        }
        else {
            const updateContact = { ...contact, ...params, mtime: Date.now() };
            await this.dal.UpdateContact(updateContact);
            return updateContact;
        }
    }
    //intern
    async ListInterns() {
        const interns = await this.dal.ListInterns();
        const viewInternArr = [];
        for (const i of (0, filter_data_handlers_1.FilterData)(interns)) {
            const result = await this.GetIntern(i.id);
            viewInternArr.push(result);
        }
        return viewInternArr;
    }
    async GetInternByUserID(user_id) {
        const interns = await this.dal.GetInternByUserID(user_id);
        const viewInternArr = [];
        for (const i of (0, filter_data_handlers_1.FilterData)(interns)) {
            const result = await this.GetIntern(i.id);
            viewInternArr.push(result);
        }
        return viewInternArr;
    }
    async GetIntern(id) {
        const intern = await this.dal.GetIntern(id);
        const viewIntern = {
            ...intern,
            contact: [],
        };
        if ((0, filter_data_handlers_1.FilterData)([intern]).length == 0) {
            throw intern_1.InternNS.Errors.InternNotFound;
        }
        else {
            const contact = await this.ListContacts(id);
            if (contact.length != +0) {
                viewIntern.contact = contact;
            }
            return viewIntern;
        }
    }
    async GetInternByCccd(cccd) {
        const intern = await this.dal.GetInternByCccd(cccd);
        const viewIntern = await this.GetIntern(intern.id);
        return viewIntern;
    }
    async CreateIntern(params) {
        const intern = {
            id: intern_1.InternNS.Generator.NewInternID(),
            intern_code: intern_1.InternNS.Generator.NewInternCode(params.cccd),
            ...params,
            ctime: Date.now(),
            mtime: Date.now(),
        };
        await this.dal.CreateIntern(intern);
        return intern;
    }
    async UpdateIntern(id, params) {
        const intern = await this.dal.GetIntern(id);
        if ((0, filter_data_handlers_1.FilterData)([intern]).length == 0) {
            throw intern_1.InternNS.Errors.InternNotFound;
        }
        else {
            const filter = { ...intern, ...params, mtime: Date.now() };
            await this.dal.UpdateIntern(filter);
            return filter;
        }
    }
    async DeleteIntern(id) {
        const intern = await this.dal.GetIntern(id);
        const contacts = await this.ListContacts(id);
        const newContacts = [];
        if ((0, filter_data_handlers_1.FilterData)([intern]).length == 0) {
            throw intern_1.InternNS.Errors.InternNotFound;
        }
        else {
            const dtime = Date.now();
            const doc = { ...intern, dtime: dtime };
            await this.dal.DeleteIntern(doc);
            if (contacts.length > 0) {
                for (const contact of contacts) {
                    const updateContact = { ...contact, dtime: dtime };
                    newContacts.push(updateContact);
                }
                await this.dal.DeleteContact(newContacts);
            }
            return doc;
        }
    }
}
exports.InternBLLBase = InternBLLBase;
//# sourceMappingURL=intern.bll.js.map