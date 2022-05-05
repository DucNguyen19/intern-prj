import rand from "../lib/rand";

export namespace OrgNS{
    export interface Org{
        id: string;
        name: string;
        code: string;
        ctime : number;
        mtime : number;
    }
    export interface CreateOrgParams{
        name: string;
        code: string;
    }
    export interface UpdateOrgParams{
        name?:string;
        code?:string;
    }
    export interface User{
        id: string;
        full_name:string;
        username:string;
        phone:string;
        role:Role;
        org_id:string;
        ctime: number;
        mtime: number;
        dtime?:number;
    }

    export enum Role {
        admin = "admin",
        tech = "tech",
        admission = "admission"
    }
    export interface ViewUser extends User{
        org:OrgNS.Org
    }
    export interface CreateUserParams{
        full_name:string;
        username:string;
        phone:string;
        role:Role;
        org_id:string;
    }
    export interface UpdateUserParams{
        full_name?:string;
        username?:string;
        phone?:string;
        role?:Role;
        org_id?:string;
    }
    export interface BLL{
        CreateOrg(params: CreateOrgParams): Promise<Org>;
        ListOrg(): Promise<Org[]>;
        GetOrg(id:string): Promise<Org>;
        UpdateOrg(id:string,params: UpdateOrgParams): Promise<Org>;

        ListUsers(): Promise<ViewUser[]>;
        GetUser(id:string): Promise<ViewUser>;
        GetUserByUserName(username: string): Promise<ViewUser>;
        CreateUser(params:CreateUserParams): Promise<ViewUser>;
        UpdateUser(id:string,params:UpdateUserParams): Promise<User>;
        DeleteUser(id: string): Promise<User>;
    }
    export interface DAL{
        CreateOrg(org: Org): Promise<void>;
        ListOrg(): Promise<Org[]>;
        GetOrg(id:string): Promise<Org>;
        UpdateOrg(org: Org): Promise<void>;

        ListUsers(): Promise<User[]>;
        GetUser(id:string): Promise<User>;
        GetUserByUserName(username: string): Promise<User>;
        CreateUser(user:User): Promise<void>;
        UpdateUser(user : User): Promise<void>;
    }
    export const Errors={
        OrgNotFound:new Error("Org not found"),
        OrgExist:new Error("Org already exists"),
        UserNotFound:new Error("User not found"),
        UserExists:new Error("User already exists")
    }
    export const Generator={
        NewOrgID:()=>rand.number(4),
        NewUserID:() => rand.uppercase(8)
    }
}