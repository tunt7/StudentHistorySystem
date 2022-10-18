import { AcInterface } from "./IActivity";
import { STDInterface } from "./IStudent";
import { AdminInterface } from "./IAdmin";
import { TimerOptions } from "timers";

export interface AcHisInterface {
    ID?: number;
	S_ID?: number;
    S?: STDInterface;
	AC_ID?: number;
    AC?: AcInterface;
    ADMIN_RECID?:number;
    ADMIN_REC?: AdminInterface;
    AC_HOUR?: number;
}