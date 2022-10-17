import { AcademyInterface } from "./IAcademy";
import { CourseInterface } from "./ICourse";
import { AdminInterface } from "./IAdmin";

export interface BranchInterface {
    BrID?: number;
	BrName: string;
	BrContact:string;		
	BrAcademyID?: string;
	BrAcademy?: AcademyInterface;
	BrCourseID?: string;
	BrCourse?: CourseInterface;
    AdminID?: number;
	Admin?: AdminInterface;
} 