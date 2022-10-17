import { AdminInterface } from "./IAdmin";
import { PointTypeInterface } from "./IPoint_Type";
import { BehaviorTypeInterface } from "./IBehavior_Type";

export interface BHInterface {
    ID?: number;
	Point: number;
	Detail: string;
	Date_Rec: Date;

	AdminID?: number;
	Admin?: AdminInterface
	PointTypeID?: number;
	PointType?:PointTypeInterface
	BehaviorTypeID?: number;
	BehaviorType?:BehaviorTypeInterface;
	StudentID?: number;
}