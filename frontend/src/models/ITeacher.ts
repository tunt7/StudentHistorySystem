import { BranchInterface } from "./IBranch";
import { PreInterface } from "./IPrefix";
import { AdminInterface } from "./IAdmin";

export interface TInterface {
    ID: number;
	FirstName: string;
	LastName: string;
	Email: string;
	Contact: string;

	BranchID?: number;
	Branch?: BranchInterface;
	PrefixID?: number;
	Prefix?: PreInterface;
	AdminID?: number;
	Admin?: AdminInterface;
}
