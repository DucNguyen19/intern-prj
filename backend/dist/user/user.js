"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNS = void 0;
const rand_1 = require("../lib/rand");
var UserNS;
(function (UserNS) {
    let Role;
    (function (Role) {
        Role["admin"] = "admin";
        Role["tech"] = "tech";
        Role["admission"] = "admission";
    })(Role = UserNS.Role || (UserNS.Role = {}));
    UserNS.Errors = {
        UserNotFound: new Error("User not found"),
        UserExists: new Error("User already exists")
    };
    UserNS.Generator = {
        NewUserID: () => rand_1.default.uppercase(8)
    };
})(UserNS = exports.UserNS || (exports.UserNS = {}));
//# sourceMappingURL=user.js.map