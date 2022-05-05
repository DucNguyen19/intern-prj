"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternNS = void 0;
const date_fns_1 = require("date-fns");
const rand_1 = require("../lib/rand");
var InternNS;
(function (InternNS) {
    InternNS.Errors = {
        InternNotFound: new Error("Intern Not Found"),
        InternExist: new Error("Intern does existed"),
        ContactNotFound: new Error("Contact Not Found"),
        ContactExists: new Error("Contact does existed")
    };
    InternNS.Generator = {
        NewInternCode: (cccd) => {
            const now = (0, date_fns_1.format)(Date.now(), "ddMMyyyy");
            return `${now}${cccd.substr(cccd.length - 4, 4)}`;
        },
        NewInternID: () => rand_1.default.uppercase(8)
    };
})(InternNS = exports.InternNS || (exports.InternNS = {}));
//# sourceMappingURL=intern.js.map