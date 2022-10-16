export interface STDInterface {
    SID: number;
	Sfirstname:string;
    Slastname :string;
	Sdob:Date | null;
    Sparent :string;
    Admission_Date :Date | null;
    Address :string;
    Phone_Number:string;
    Graduate_School:string;
    Grade :string;
    Sidentity_card :string;

	BTID: number;
	ELID: number;
	EQID: number;

    AcademyID: number;
    BranchID: number;
    TeacherID: number;
}