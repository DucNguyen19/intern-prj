"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgNS = void 0;
const rand_1 = require("../lib/rand");
var OrgNS;
(function (OrgNS) {
    let Role;
    (function (Role) {
        Role["admin"] = "admin";
        Role["tech"] = "tech";
        Role["admission"] = "admission";
    })(Role = OrgNS.Role || (OrgNS.Role = {}));
    OrgNS.Errors = {
        OrgNotFound: new Error("Org not found"),
        OrgExist: new Error("Org already exists"),
        UserNotFound: new Error("User not found"),
        UserExists: new Error("User already exists")
    };
    OrgNS.Generator = {
        NewOrgID: () => rand_1.default.number(4),
        NewUserID: () => rand_1.default.uppercase(8)
    };
})(OrgNS = exports.OrgNS || (exports.OrgNS = {}));
//# sourceMappingURL=org.js.map