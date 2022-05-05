import * as express from "express";
import { GetAuthData, NewAuthMiddleware } from "../auth/auth.api.middleware";
import { HttpParamValidators } from "../lib/http";
import { InternNS } from "./intern";

export  function NewInternAPI(
    internBLL:InternNS.BLL
){
    const router = express.Router();

    router.get('/intern/list',async (req, res)=>{
        const interns=await internBLL.ListInterns();
        res.json(interns)
    })

    router.get('/intern/get',async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query,"id",8);
        const intern = await internBLL.GetIntern(id);
        res.json(intern)
    })

    router.post('/intern/create',async (req, res)=>{
        const params: InternNS.CreateInternParams={
            name: HttpParamValidators.MustBeString(req.body,"name",2),
            birthday: HttpParamValidators.MustBeString(req.body,"birthday",10),
            cccd: HttpParamValidators.MustBeString(req.body,"cccd",8),
            createdBy: HttpParamValidators.MustBeString(req.body,"createdBy",8),
        }
        const intern=await internBLL.CreateIntern(params)
        res.json(intern)
    })

    router.post('/intern/update',async (req, res)=>{
        const id= HttpParamValidators.MustBeString(req.query, "id",8)
        const params:InternNS.UpdateInternParams={}
        if(req.body.name){
            params.name= HttpParamValidators.MustBeString(req.body,'name',2)
        }
        if(req.body.createdBy){
            params.createdBy= HttpParamValidators.MustBeString(req.body,'createdBy',8)
        }
        if(req.body.birthday){
            params.birthday=HttpParamValidators.MustBeString(req.body,"birthday",10)
        }
        if(req.body.cccd){
            params.cccd=HttpParamValidators.MustBeString(req.body,"cccd",8)
        }
        const intern=await internBLL.UpdateIntern(id, params)
        res.json(intern)
    })

    router.post('/intern/delete',async (req, res)=>{
        const id= HttpParamValidators.MustBeString(req.query, "id",8)
        const result=await internBLL.DeleteIntern(id)
        res.json(result)
    })

    //contact
    router.get('/contact/list',async (req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query,"intern_id",8)
        const contacts = await internBLL.ListContacts(id)
        res.json(contacts)
    })

    router.get('/contact/get',async (req, res)=>{
        const id= HttpParamValidators.MustBeString(req.query, "id",8)
        const contact=await internBLL.GetContact(id)
        res.json(contact)
    })

    router.post('/contact/create',async (req, res)=>{
        const params:InternNS.CreateContactParams={
            intern_id:HttpParamValidators.MustBeString(req.body,"intern_id",8),
            region:HttpParamValidators.MustBeString(req.body,"region",3),
            phone:HttpParamValidators.MustBeNumber(req.body,"phone",10),
            school:HttpParamValidators.MustBeString(req.body,"school",3),
            link_fb:HttpParamValidators.MustBeString(req.body,"link_fb",2),
            skill: req.body.skill
        }
        const contact= await internBLL.CreateContact(params)
        res.json(contact)
    })

    router.post('/contact/update',async(req, res)=>{
        const intern_id=HttpParamValidators.MustBeString(req.query,"id",8)
        const params:InternNS.UpdateContactParams={}
        if(req.body.region){
            params.region= HttpParamValidators.MustBeString(req.body,"region",3)
        }
        if(req.body.phone){
            params.phone= HttpParamValidators.MustBeNumber(req.body,"phone",10)
        }
        if(req.body.school){
            params.school= HttpParamValidators.MustBeString(req.body,"school",3)
        }
        if(req.body.link_fb){
            params.link_fb=HttpParamValidators.MustBeString(req.body,"link_fb",2)
        }
        if(req.body.skill){
            params.skill= req.body.skill
        }
        const contact=await internBLL.UpdateContact(intern_id,params)
        res.json(contact)
    })

    router.post('/contact/delete',async(req, res)=>{
        const id=HttpParamValidators.MustBeString(req.query,"id",8)
        // const result=await internBLL.DeleteContact(id)
        // res.json(result)
    })

    return router
}
