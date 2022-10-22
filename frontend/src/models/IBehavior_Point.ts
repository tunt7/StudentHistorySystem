import { AdminInterface } from "./IAdmin";
import { PointTypeInterface } from "./IPoint_Type";
import { BehaviorTypeInterface } from "./IBehavior_Type";
import { STDInterface } from "./IStudent";

export interface BHInterface {
    	ID?: number;
	bppoint?: number;
	bpdetail?: string;
	Date_Rec: Date | null;

	AdminID?: number;
	Admin?: AdminInterface
	PointTypeID?: number;
	PointType?:PointTypeInterface
	BehaviorTypeID?: number;
	BehaviorType?:BehaviorTypeInterface;
	StudentID?: number;
	Student?: STDInterface;
}
