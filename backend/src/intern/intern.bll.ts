import { InternNS } from "./intern";
import { FilterData } from "../common/filter_data_handlers";

export class InternBLLBase implements InternNS.BLL {
  constructor(private dal: InternNS.DAL) {}
  async init() {}

  //contact
  async ListContacts(intern_id: string) {
    const contacts = await this.dal.ListContacts(intern_id);
    return FilterData<InternNS.Contact>(contacts);
  }
  
  async GetContact(id: string) {
    const contact = await this.dal.GetContact(id);
    if (!contact ||FilterData<InternNS.Contact>([contact]).length == 0) {
      throw InternNS.Errors.ContactNotFound;
    }
    return contact;
  }
  async CreateContact(params: InternNS.CreateContactParams) {
    const contact = {
      id: InternNS.Generator.NewInternID(),
      ...params,
      ctime: Date.now(),
      mtime: Date.now(),
    };
    await this.dal.CreateContact(contact);
    return contact;
  }
  async UpdateContact(id: string, params: InternNS.UpdateContactParams) {
    const contact = await this.GetContact(id);
    if (FilterData<InternNS.Contact>([contact]).length == 0) {
      throw InternNS.Errors.ContactNotFound;
    } else {
      const updateContact = { ...contact, ...params, mtime: Date.now() };
      await this.dal.UpdateContact(updateContact);
      return updateContact;
    }
  }


  //intern

  async ListInterns() {
    const interns = await this.dal.ListInterns();
    const viewInternArr = [] as InternNS.ViewIntern[];
    for (const i of FilterData(interns)) {
      const result = await this.GetIntern(i.id);
      viewInternArr.push(result);
    }
    return viewInternArr;
  }
  async GetInternByUserID(user_id: string) {
    const interns=await this.dal.GetInternByUserID(user_id);
    const viewInternArr = [] as InternNS.ViewIntern[];
    for (const i of FilterData(interns)) {
      const result = await this.GetIntern(i.id);
      viewInternArr.push(result);
    }
    return viewInternArr;
  }
  async GetIntern(id: string) {
    const intern = await this.dal.GetIntern(id);
    const viewIntern: InternNS.ViewIntern = {
      ...intern,
      contact: [],
    };
    if (FilterData<InternNS.Intern>([intern]).length == 0) {
      throw InternNS.Errors.InternNotFound;
    } else {
      const contact = await this.ListContacts(id);
      if (contact.length != +0) {
        viewIntern.contact = contact;
      }
      return viewIntern;
    }
  }
  async GetInternByCccd(cccd: string){
    const intern = await this.dal.GetInternByCccd(cccd);
    const viewIntern=await this.GetIntern(intern.id)
    return viewIntern;
  }
  async CreateIntern(params: InternNS.CreateInternParams) {
    const intern = {
      id: InternNS.Generator.NewInternID(),
      intern_code: InternNS.Generator.NewInternCode(params.cccd),
      ...params,
      ctime: Date.now(),
      mtime: Date.now(),
    };
    await this.dal.CreateIntern(intern);
    return intern;
  }

  async UpdateIntern(id: string, params: InternNS.UpdateInternParams) {
    const intern = await this.dal.GetIntern(id);
    if (FilterData<InternNS.Intern>([intern]).length == 0) {
      throw InternNS.Errors.InternNotFound;
    } else {
      const filter = { ...intern, ...params, mtime: Date.now() };
      await this.dal.UpdateIntern(filter);
      return filter;
    }
  }
  async DeleteIntern(id: string) {
    const intern = await this.dal.GetIntern(id);
    const contacts=await this.ListContacts(id)
    const newContacts=[]
    if (FilterData<InternNS.Intern>([intern]).length == 0) {
      throw InternNS.Errors.InternNotFound;
    } else {
      const dtime=Date.now();
      const doc = { ...intern, dtime: dtime };
      await this.dal.DeleteIntern(doc);
      if(contacts.length>0){
        for(const contact of contacts){
          const updateContact ={...contact,dtime: dtime};
          newContacts.push(updateContact)
        }
        await this.dal.DeleteContact(newContacts)
      }
      return doc;
    }
  }
}
