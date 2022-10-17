import { AcademyInterface } from "./IAcademy";
import { CourseInterface } from "./ICourse";
import { AdminInterface } from "./IAdmin"; 

export interface BranchInterface { 
    ID?: number;
	Brname?: string;
	Contact?:string;
	AdminID?: number;
	Admin?: AdminInterface;		
	AcademyID?: number;
	Academy?: AcademyInterface;
	CourseID?: number;
	Course?: CourseInterface;
    
} 