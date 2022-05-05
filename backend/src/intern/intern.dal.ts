import { FromMongoData, MongoDB, MongoErrorCodes, ToMongoData,MongoModel } from "../lib/mongodb";
import { InternNS } from "./intern";
export class InternDALMongo implements InternNS.DAL{
    constructor(private db: MongoDB){}

    private col_intern = this.db.collection<MongoModel<InternNS.Intern>>("intern")

    private col_contact=this.db.collection<MongoModel<InternNS.Contact>>("contact")

    async init(){
        // danh index
    }

    async ListInterns(){
        const interns= await this.col_intern.find().toArray()
        return FromMongoData.Many<InternNS.Intern>(interns)
    }

    async GetIntern(id:string){
        const intern=await this.col_intern.findOne({_id:id})
        return FromMongoData.One<InternNS.Intern>(intern)
    }
    async GetInternByCccd(cccd: string){
        const intern=await this.col_intern.findOne({cccd:cccd})
        return FromMongoData.One<InternNS.Intern>(intern)
    }
    async GetInternByUserID(user_id:string){
        const interns=await this.col_intern.find({createdBy:user_id}).toArray()
        return FromMongoData.Many<InternNS.Intern>(interns)
    }
    async CreateIntern(intern:InternNS.Intern){
        const doc=ToMongoData.One<InternNS.Intern>(intern)
        try {
            await this.col_intern.insertOne(doc)
        } catch (error) {
            if(error.codes===MongoErrorCodes.Duplicate){
                throw InternNS.Errors.InternExist
            }else{
                throw error;
            }
        } 
    }

    async UpdateIntern(intern:InternNS.Intern){
        const doc= ToMongoData.One<InternNS.Intern>(intern)
        try {
            await this.col_intern.updateOne({_id:intern.id},{$set:doc})
        } catch (error) {
            throw error
        }
    }

    async DeleteIntern(intern: InternNS.Intern){
        await this.UpdateIntern(intern)
    }

    //contact
    async ListContacts(intern_id:string){
        const contacts = await this.col_contact.find({ intern_id }).toArray();
        return FromMongoData.Many<InternNS.Contact>(contacts)
    }

    async GetContact(id: string){
        const contact = await this.col_contact.findOne({_id:id})
        return FromMongoData.One<InternNS.Contact>(contact)
    }
    
    async CreateContact(contact: InternNS.Contact){
        const doc=ToMongoData.One<InternNS.Contact>(contact);
        try {
            await this.col_contact.insertOne(doc)
        } catch (error) {
            if(error.codes=== MongoErrorCodes.Duplicate){
                throw InternNS.Errors.ContactExists
            }else{
                throw error
            }
        }
    }

    async UpdateContact(contact: InternNS.Contact){
        const updateContact=ToMongoData.One<InternNS.Contact>(contact)
        try {
            await this.col_contact.updateOne({_id:contact.id},{$set:updateContact})
        } catch (error) {
            throw error
        }
    }
   
    async DeleteContact(contacts:InternNS.Contact[]){
        for(const contact of contacts){
            await this.UpdateContact(contact)
        }
    }
}