"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterData = void 0;
function FilterData(array) {
    if (array.some(el => el === null)) {
        return [];
    }
    const data = array.filter((el) => !el.hasOwnProperty("dtime"));
    return data;
}
exports.FilterData = FilterData;
//# sourceMappingURL=filter_data_handlers.js.map