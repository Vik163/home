import { UserSchema } from "../types/user";

export const getUserName = (state: UserSchema) => state.name;
