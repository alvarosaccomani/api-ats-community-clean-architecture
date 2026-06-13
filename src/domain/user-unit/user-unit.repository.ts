import { UserUnitEntity, UserUnitUpdateData } from "./user-unit.entity";

export interface UserUnitRepository {
    getUsersUnits(cmp_uuid: string, usr_uuid: string): Promise<UserUnitEntity[] | null>;
    getUnitUsers(cmp_uuid: string, uni_uuid: string): Promise<UserUnitEntity[] | null>;
    findUserUnitById(cmp_uuid: string, usr_uuid: string, uni_uuid: string): Promise<UserUnitEntity | null>;
    createUserUnit(UserUnit: UserUnitEntity): Promise<UserUnitEntity | null>;
    updateUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string, UserUnit: UserUnitUpdateData): Promise<UserUnitEntity | null>;
    deleteUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string): Promise<UserUnitEntity | null>;
}