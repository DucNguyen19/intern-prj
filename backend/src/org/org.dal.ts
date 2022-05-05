import { OrgNS } from "./org";
import { FromMongoData, MongoDB, MongoErrorCodes, ToMongoData, MongoModel } from "../lib/mongodb";
export class OrgDALMongo implements OrgNS.DAL {
    constructor(private db: MongoDB){ }

    private col_org=this.db.collection<MongoModel<OrgNS.Org>>("location");
    private col_user = this.db.collection<MongoModel<OrgNS.User>>("user");

    async init(){ }

    async ListOrg() {
        const orgs = await this.col_org.find().toArray();
        return FromMongoData.Many<OrgNS.Org>(orgs);
    }

    async GetOrg(id:string) {
        const org = await this.col_org.findOne({_id : id})
        return FromMongoData.One<OrgNS.Org>(org)
    }

    async CreateOrg(org:OrgNS.Org){
        const doc= ToMongoData.One<OrgNS.Org>(org)
        try {
            await this.col_org.insertOne(doc)
        } catch (error) {
            if(error.codes === MongoErrorCodes.Duplicate){
                throw OrgNS.Errors.OrgExist
            }else{
                throw error
            }
        }
    }

    async UpdateOrg(org:OrgNS.Org){
        const doc= ToMongoData.One<OrgNS.Org>(org)
        try {
            await this.col_org.updateOne({_id:org.id}, {$set : doc })
        } catch (error) {
            throw error
        }
    }

    async ListUsers() {
        const users = await this.col_user.find().toArray();
        return FromMongoData.Many<OrgNS.User>(users);
    }

    async GetUser(id: string) {
        const user = await this.col_user.findOne({ _id : id });
        return FromMongoData.One<OrgNS.User>(user);
    }

    async GetUserByUserName(name: string){
        const user = await this.col_user.findOne({username :name});
        return FromMongoData.One<OrgNS.User>(user);
    }
    
    async CreateUser(user: OrgNS.User) {
        const doc = ToMongoData.One<OrgNS.User>(user);
        try {
            await this.col_user.insertOne(doc);
        } catch (e) {
            if (e.codes === MongoErrorCodes.Duplicate) {
                throw OrgNS.Errors.UserExists
            } else {
                throw e;
            }
        }
    }

    async UpdateUser(user: OrgNS.User) {
        const doc = ToMongoData.One<OrgNS.User>(user);
        try {
            await this.col_user.updateOne({ _id : user.id }, { $set : doc });
        } catch (e) {
            throw e;
        }
    }
    async DeleteUser(user: OrgNS.User) {
        await this.UpdateUser(user);
    }
}