import { FilterData } from "../common/filter_data_handlers";
import { OrgNS } from "./org";

export class OrgBLLBase implements OrgNS.BLL{
    constructor(private dal: OrgNS.DAL) { }

    async init(){ }

    async ListOrg(){
        const orgs = await this.dal.ListOrg()
        return orgs
    }

    async GetOrg(id:string){
        const org=await this.dal.GetOrg(id)
        if(!org){
            throw OrgNS.Errors.OrgNotFound
        }
        return org
    }

    async CreateOrg(params:OrgNS.CreateOrgParams){
        const org={
            id:OrgNS.Generator.NewOrgID(),
            ...params,
            ctime:Date.now(),
            mtime: Date.now()
        }
        await this.dal.CreateOrg(org)
        return org
    }

    async UpdateOrg(id:string,params:OrgNS.UpdateOrgParams){
        const org=await this.GetOrg(id)
        const doc={
            ...org,...params, mtime: Date.now()
        }
        await this.dal.UpdateOrg(doc)
        return doc
    }

    async ListUsers(){
        const users= await this.dal.ListUsers();
        const viewUserArr: OrgNS.ViewUser[]=[]
        for(const user of FilterData<OrgNS.User>(users)) {
            const viewUser= await this.GetUser(user.id)
            viewUserArr.push(viewUser)
        }
        return viewUserArr;
    }

    async GetUser(id:string){
        const user= await this.dal.GetUser(id)
        if (FilterData<OrgNS.User>([user]).length === +0) {
            throw OrgNS.Errors.UserNotFound;
        }
        const org = await this.GetOrg(user.org_id)
        const viewUser: OrgNS.ViewUser = {
            ...user,
            org:org
        }
        return viewUser
    }

    async GetUserByUserName(name:string){
        const user = await this.dal.GetUserByUserName(name);
        if(FilterData<OrgNS.User>([user]).length === +0) {
            throw OrgNS.Errors.UserNotFound;
        }
        const org = await this.GetOrg(user.org_id);
        const viewUser: OrgNS.ViewUser={
            ...user,
            org:org
        }
        return viewUser;
    }

    async CreateUser(params: OrgNS.CreateUserParams){
        const user={
            id: OrgNS.Generator.NewUserID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        }
        const org = await this.GetOrg(params.org_id);
        await this.dal.CreateUser(user)
        return {...user, org:org}
    }

    async UpdateUser(id:string,params: OrgNS.UpdateUserParams) {
        const user= await this.GetUser(id)
        const doc = {
            ...user,...params, mtime: Date.now()
        }
        await this.dal.UpdateUser(doc)
        return doc;
    }

    async DeleteUser(id: string){
        const user=await this.dal.GetUser(id)
        if(!user|| FilterData<OrgNS.User>([user]).length === +0){
            throw OrgNS.Errors.UserNotFound;
        }
        const doc={
            ...user, dtime: Date.now()
        }
        await this.dal.UpdateUser(doc);
        return doc
    }
}