
export namespace JobNS {
    export interface Job {
        id: string;
        ref: "intern" | "user";
        ref_id: string; // TTS
        org_id: string; // phong ban
        created_by: string; // nguoi tao cong vc luc dau la nguoi tao intern
        modified_by: string; // nguoi sua
        role: string;
        status: JobStatus;
        ctime: number;
        mtime: number;
    }

    export enum JobStatus {
        New = "new",
        Running = "running",
        Done = "done",
        Cancel = "cancel"
    }

    //hop dong : contract
    export interface Contract {
        id: string;
        job_id: string;
        start_date: string;
        end_date: string;
        salary: number;
        status: ContractStatus;
        ctime: number;
        mtime: number;
    }

    export enum ContractStatus {
        active = "active",
        deactive = "deactive"
    }

    export interface Room {
        id: string;
        user_id: string;
        code: string;
        intern_ids : Set<string>;
        status: "active" | "deactive";
        ctime: number;
        mtime: number;
        dtime?: number;
    }
}