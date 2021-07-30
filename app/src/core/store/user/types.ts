import { IUser } from "../../interfaces/IUsers";

export type UserState = {
    logged: boolean;
    info: IUser | null;
}