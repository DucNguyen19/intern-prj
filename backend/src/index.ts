import { ReadConfig } from "./config";
import * as express from "express";
import * as cors from "cors";
import "./lib/express";
import "./ext/log";
import { ExpressStaticFallback } from "./lib/express";
import { HttpErrorHandler } from "./common/http_errror_handler";
import { MongoCommon } from "./lib/mongodb";

import { TodoDALMongo } from "./todo/todo.dal";
import { TodoBLLBase } from "./todo/todo.bll";
import { NewTodoAPI } from "./todo/todo.api";

import { UserAuthDALMongo } from "./auth/auth.dal.mongo";
import { UserAuthBLLBase } from "./auth/auth.bll.base";
import { NewAuthAPI } from "./auth/auth.api";

import { InternDALMongo } from './intern/intern.dal'
import { InternBLLBase } from "./intern/intern.bll";
import { NewInternAPI} from './intern/intern.api'

import {OrgDALMongo } from './org/org.dal'
import { OrgBLLBase } from "./org/org.bll";
import { NewOrgAPI } from "./org/org.api";
export async function main() {
    const config = await ReadConfig();
    console.log(config);
    const client = await MongoCommon.Connect(config.database.db_url);
    console.log('connected to database');
    const database = client.db(config.database.db_name);
    /********************************************************/
    const todoDAL = new TodoDALMongo(database);
    todoDAL.init();
    const todoBLL = new TodoBLLBase(todoDAL);
    todoBLL.init();
    /*******************************************************/
    const internDAL=new InternDALMongo(database)
    internDAL.init()
    const internBLL=new InternBLLBase(internDAL)
    internBLL.init()
    /*******************************************************/
    const orgDAL = new OrgDALMongo(database)
    orgDAL.init()
    const orgBLL=new OrgBLLBase(orgDAL)
    orgBLL.init()
    /*******************************************************/

    /********************************************************/
    const authDAL = new UserAuthDALMongo(database);
    authDAL.init();
    const authBLL = new UserAuthBLLBase(authDAL, orgBLL);
    authBLL.init();
    /*******************************************************/
    
    const app = express();
    app.use(express.json());
    app.disable("x-powered-by");
    app.use(cors())
    /*******************************************************/
    app.use("/api/auth", NewAuthAPI(authBLL))
    app.use("/api/todo", NewTodoAPI(todoBLL))
    app.use("/api/intern", NewInternAPI(internBLL));
    app.use("/api/org",NewOrgAPI(orgBLL));
    /*******************************************************/
    app.use("/", ExpressStaticFallback(config.app.dir));
    app.use(HttpErrorHandler);
  
    console.log(`listen on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        const err = arguments[0];
        if (err) {
            console.log(err);
        }
    });
}
main().catch(err => console.log(err));




