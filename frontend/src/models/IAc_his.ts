import { AcInterface } from "./IActivity";
import { STDInterface } from "./IStudent";
import { AdminInterface } from "./IAdmin";

export interface AcHisInterface {
    ID?: number;
	STUDENT_ID?: number;
    STUDENT?: STDInterface;
	ACTIVITY_ID?: number;
    ACTIVITY?: AcInterface;
    ADMIN_ID?:number;
    ADMIN?: AdminInterface;
    ACHOUR?: number;
}