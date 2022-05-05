import { format } from "date-fns";
import rand from "../lib/rand";

export namespace InternNS {
  export interface Intern {
    id: string;
    intern_code:string,
    name: string;
    birthday: string; //yyyy-mm-dd
    cccd: string;
    createdBy: string;
    modifiedBy?:string;
    ctime: number;
    mtime: number;
    dtime?:number;
  }
  

  export interface Contact {
    id : string;
    intern_id : string;
    region:string,
    phone:string;
    school:string;
    link_fb:string;
    skill:Array<string>;
    ctime:number;
    mtime:number;
    dtime?:number;
  }

  export interface CreateInternParams {
    name: string;
    birthday: string;
    cccd: string;
    createdBy: string;
    modifiedBy?:string;
  }
  export interface CreateContactParams {
    intern_id:string;
    region:string,
    phone:string;
    school:string;
    link_fb:string;
    skill:Array<string>;
  }
  export interface UpdateContactParams{
    // intern_id?:string;
    region?:string;
    phone?:string;
    school?:string;
    link_fb?:string;
    skill?:Array<string>;
  }
  export interface UpdateInternParams {
    name?: string;
    birthday?: string;
    cccd?: string;
    createdBy?: string;
  }

  export interface ViewIntern extends Intern {
    contact : Contact[];
  }

  export interface BLL {
    GetIntern(id: string): Promise<ViewIntern>;
    GetInternByCccd(cccd: string): Promise<ViewIntern>;
    GetInternByUserID(user_id: string): Promise<ViewIntern[]>;
    CreateIntern(params: CreateInternParams): Promise<Intern>;
    ListInterns(): Promise<ViewIntern[]>;
    UpdateIntern(id: string, params: UpdateInternParams): Promise<Intern>;
    DeleteIntern(id: string): Promise<Intern>;
    GetContact(id: string): Promise<Contact>;
    ListContacts(intern_id: string): Promise<Contact[]>;
    CreateContact(params: CreateContactParams): Promise<Contact>;
    UpdateContact(id:string,params: UpdateContactParams): Promise<Contact>;
  }
  export interface DAL {
    GetIntern(id: string): Promise<Intern>;
    GetInternByCccd(cccd: string): Promise<Intern>;
    GetInternByUserID(user_id: string): Promise<Intern[]>;
    CreateIntern(intern: Intern): Promise<void>;
    ListInterns(): Promise<Intern[]>;
    UpdateIntern(intern: Intern): Promise<void>;
    DeleteIntern(intern: Intern): Promise<void>;
    GetContact(id: string): Promise<Contact>;
    ListContacts(intern_id: string): Promise<Contact[]>;
    CreateContact(contact:Contact): Promise<void>;
    UpdateContact(contact:Contact):Promise<void>;
    DeleteContact(contacts:Contact[]): Promise<void>;
  }
  export const Errors = {
    InternNotFound: new Error("Intern Not Found"),
    InternExist: new Error("Intern does existed"),
    ContactNotFound: new Error("Contact Not Found"),
    ContactExists: new Error("Contact does existed")
  };
  export const Generator={
      NewInternCode : (cccd:string) => {
        const now = format(Date.now(), "ddMMyyyy");
        return `${now}${cccd.substr(cccd.length-4,4)}`;
      },
      NewInternID : () => rand.uppercase(8)
  }
}
