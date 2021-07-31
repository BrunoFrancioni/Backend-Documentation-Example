import { IUser } from "../../../core/interfaces/IUsers";

export type UserState = {
    logged: boolean;
    info: IUser | null;
}