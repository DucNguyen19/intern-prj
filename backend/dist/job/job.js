"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobNS = void 0;
var JobNS;
(function (JobNS) {
    let JobStatus;
    (function (JobStatus) {
        JobStatus["New"] = "new";
        JobStatus["Running"] = "running";
        JobStatus["Done"] = "done";
        JobStatus["Cancel"] = "cancel";
    })(JobStatus = JobNS.JobStatus || (JobNS.JobStatus = {}));
    let ContractStatus;
    (function (ContractStatus) {
        ContractStatus["active"] = "active";
        ContractStatus["deactive"] = "deactive";
    })(ContractStatus = JobNS.ContractStatus || (JobNS.ContractStatus = {}));
})(JobNS = exports.JobNS || (exports.JobNS = {}));
//# sourceMappingURL=job.js.map