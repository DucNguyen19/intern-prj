"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoNS = void 0;
const rand_1 = require("../lib/rand");
var TodoNS;
(function (TodoNS) {
    TodoNS.Errors = {
        TodoNotFound: new Error("Todo Not Found"),
        TodoExist: new Error("Todo does existed")
    };
    TodoNS.Generator = {
        NewTodoID: () => rand_1.default.uppercase(8),
        // NewInternCode : () => 
    };
})(TodoNS = exports.TodoNS || (exports.TodoNS = {}));
//# sourceMappingURL=todo.js.map