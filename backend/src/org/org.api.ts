import * as express from 'express';
import { OrgNS } from './org';
import {HttpParamValidators} from '../lib/http';

export function NewOrgAPI(
    orgBLL: OrgNS.BLL
){
    const router= express.Router();
    const role = Object.values(OrgNS.Role);

    router.get('/org/list',async (req, res)=>{
        const orgs = await orgBLL.ListOrg();
        res.json(orgs);
    })

    router.get('/org/get',async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query, "id",4);
        const org = await orgBLL.GetOrg(id)
        res.json(org);
    })

    router.post('/org/create', async (req, res)=>{
        const params:OrgNS.CreateOrgParams={
            name: HttpParamValidators.MustBeString(req.body, "name", 2),
            code: HttpParamValidators.MustBeString(req.body, "code",2)
        }
        const org = await orgBLL.CreateOrg(params)
        res.json(org)
    })

    router.post('/org/update', async (req, res)=>{
        const id= HttpParamValidators.MustBeString(req.query, "id",4)
        const params:OrgNS.UpdateOrgParams={}
        if(req.body.name){
            params.name = HttpParamValidators.MustBeString(req.body,"name",2)
        }
        if(req.body.code){
            params.code= HttpParamValidators.MustBeString(req.body,"code",2)
        }
        const org=await orgBLL.UpdateOrg(id,params)
        res.json(org)
    })

    router.get('/user/list',async (req, res) =>{
        const users = await orgBLL.ListUsers()
        res.json(users)
    })

    router.get('/user/get',async (req, res) =>{
        let doc: OrgNS.User;
        if (req.query.id) {
            const id = HttpParamValidators.MustBeString(req.query, "id", 8);
            doc = await orgBLL.GetUser(id)
        }
        if(req.query.username){
            const username = HttpParamValidators.MustBeString(req.query,"username",2)
            const user=await orgBLL.GetUserByUserName(username)
            return res.json(user)
        }
        res.json(doc);
    })

    router.post('/user/create',async(req, res)=>{
        const params: OrgNS.CreateUserParams={
            full_name:HttpParamValidators.MustBeString(req.body,"full_name",2),
            username:HttpParamValidators.MustBeString(req.body,"username",2),
            phone:HttpParamValidators.MustBeNumber(req.body,"phone",10),
            role:HttpParamValidators.MustBeOneOf(req.body,"role",role),
            org_id:HttpParamValidators.MustBeString(req.body,"org_id",4)
        }
        const user = await orgBLL.CreateUser(params);
        res.json(user)
    })

    router.post('/user/update',async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query,"id",8);
        let params: OrgNS.UpdateUserParams={}
        if (req.body.full_name) {
            params.full_name=HttpParamValidators.MustBeString(req.body,"full_name",2)
        }
        if (req.body.username) {
            params.username= HttpParamValidators.MustBeString(req.body,"username",2)
        }
        if (req.body.phone) {
            params.phone= HttpParamValidators.MustBeNumber(req.body,"phone",10)
        }
        if (req.body.role) {
            params.role= HttpParamValidators.MustBeOneOf(req.body,"role",role)
        }
        if(req.body.org_id){
            params.org_id= HttpParamValidators.MustBeString(req.body,"org_id",4)
        }
        const user=await orgBLL.UpdateUser(id,params)
        res.json(user)
    })

    router.post('/user/delete', async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query, "id",8)
        await orgBLL.DeleteUser(id);
        res.json(1);
    })

    return router
}