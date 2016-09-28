import { Foo } from "../models";

export interface AppState {
    foos: Array<Foo>;
	currentUser: any;
    isLoggedIn: boolean;
    token: string;
}
