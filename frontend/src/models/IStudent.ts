import { BTInterface } from "./IBlood_Type";
import { ELInterface } from "./IEducation_Level";
import { EQInterface } from "./IEducation_Qualification";
import { BranchInterface } from "./IBranch"
import { TInterface } from "./ITeacher"
export interface STDInterface {
    ID?: number;
	Sfirstname?:string;
    Slastname? :string;
	Sdob:Date | null;
    Sparent?:string;
    Admission_Date :Date | null;
    Address?:string;
    Phone_Number?:string;
    Graduate_School?:string;
    Grade?:string;
    Sidentity_number ?:string;

	BTID?: number;
    Blood_Type?: BTInterface;
	ELID?: number;
    Education_Level?:ELInterface;
	EQID?: number;
    Education_Qualification?:EQInterface;

    BranchID?: number;
    Branch?:BranchInterface;
    TeacherID?: number;
    Teacher?:TInterface;
}
