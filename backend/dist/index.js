"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const config_1 = require("./config");
const express = require("express");
const cors = require("cors");
require("./lib/express");
require("./ext/log");
const express_1 = require("./lib/express");
const http_errror_handler_1 = require("./common/http_errror_handler");
const mongodb_1 = require("./lib/mongodb");
const todo_dal_1 = require("./todo/todo.dal");
const todo_bll_1 = require("./todo/todo.bll");
const todo_api_1 = require("./todo/todo.api");
const auth_dal_mongo_1 = require("./auth/auth.dal.mongo");
const auth_bll_base_1 = require("./auth/auth.bll.base");
const auth_api_1 = require("./auth/auth.api");
const intern_dal_1 = require("./intern/intern.dal");
const intern_bll_1 = require("./intern/intern.bll");
const intern_api_1 = require("./intern/intern.api");
const org_dal_1 = require("./org/org.dal");
const org_bll_1 = require("./org/org.bll");
const org_api_1 = require("./org/org.api");
async function main() {
    const config = await (0, config_1.ReadConfig)();
    console.log(config);
    const client = await mongodb_1.MongoCommon.Connect(config.database.db_url);
    console.log('connected to database');
    const database = client.db(config.database.db_name);
    /********************************************************/
    const todoDAL = new todo_dal_1.TodoDALMongo(database);
    todoDAL.init();
    const todoBLL = new todo_bll_1.TodoBLLBase(todoDAL);
    todoBLL.init();
    /*******************************************************/
    const internDAL = new intern_dal_1.InternDALMongo(database);
    internDAL.init();
    const internBLL = new intern_bll_1.InternBLLBase(internDAL);
    internBLL.init();
    /*******************************************************/
    const orgDAL = new org_dal_1.OrgDALMongo(database);
    orgDAL.init();
    const orgBLL = new org_bll_1.OrgBLLBase(orgDAL);
    orgBLL.init();
    /*******************************************************/
    /********************************************************/
    const authDAL = new auth_dal_mongo_1.UserAuthDALMongo(database);
    authDAL.init();
    const authBLL = new auth_bll_base_1.UserAuthBLLBase(authDAL, orgBLL);
    authBLL.init();
    /*******************************************************/
    const app = express();
    app.use(express.json());
    app.disable("x-powered-by");
    app.use(cors());
    /*******************************************************/
    app.use("/api/auth", (0, auth_api_1.NewAuthAPI)(authBLL));
    app.use("/api/todo", (0, todo_api_1.NewTodoAPI)(todoBLL));
    app.use("/api/intern", (0, intern_api_1.NewInternAPI)(internBLL));
    app.use("/api/org", (0, org_api_1.NewOrgAPI)(orgBLL));
    /*******************************************************/
    app.use("/", (0, express_1.ExpressStaticFallback)(config.app.dir));
    app.use(http_errror_handler_1.HttpErrorHandler);
    console.log(`listen on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        const err = arguments[0];
        if (err) {
            console.log(err);
        }
    });
}
exports.main = main;
main().catch(err => console.log(err));
//# sourceMappingURL=index.js.map