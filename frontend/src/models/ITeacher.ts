import { BranchInterface } from "./IBranch";
import { PreInterface } from "./IPrefix";
import { AdminInterface } from "./IAdmin";

export interface TInterface {
    ID?: number;
	TfirstName?: string;
	TlastName?: string;
	Temail?: string;
	Tcontact?: string;

	BranchID?: number;
	Branch?: BranchInterface;
	PrefixID?: number;
	Prefix?: PreInterface;
	AdminID?: number;
	Admin?: AdminInterface;
}
