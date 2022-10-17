import { LInterface } from "./ILocation";
import { TInterface } from "./ITeacher";
import { AdminInterface } from "./IAdmin";


export interface AcInterface {
    ID?: number;
    Acname?: string;
	Date_s: Date | null;
	Date_e: Date | null;
	Time_s: Date | null;
	Time_e: Date | null;

	LocationID?: number;
	Location?: LInterface;
	TeacherID?: number;
	Teacher?: TInterface;
	AdminID?: number;
	Admin?: AdminInterface
}
