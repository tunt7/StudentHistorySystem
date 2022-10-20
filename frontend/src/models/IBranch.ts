import { AcademyInterface } from "./IAcademy";
import { RoomInterface } from "./IRoom";
import { AdminInterface } from "./IAdmin"; 

export interface BranchInterface { 
    ID?: number;
	Brname?: string;
	Contact?:string;
	AdminID?: number;
	Admin?: AdminInterface;		
	AcademyID?: number; 
	Academy?: AcademyInterface;
	RoomID?: number;
	Room?: RoomInterface;
    
} 