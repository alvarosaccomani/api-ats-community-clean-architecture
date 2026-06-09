import { UserRolCompanyEntity } from "./user-rol-company.entity";

export interface UserRolCompanyRepository {
    getUserRolesCompany(cmp_uuid: string): Promise<UserRolCompanyEntity[] | null>;
    findUserRolCompanyById(cmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null>;
    createUserRolCompany(userRolCompany: UserRolCompanyEntity): Promise<UserRolCompanyEntity | null>;
    updateUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string, userRolCompany: UserRolCompanyEntity): Promise<UserRolCompanyEntity | null>;
    deleteUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null>;
    existUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string): Promise<UserRolCompanyEntity | null>;
    getUserRolesCompanyByUser(usr_uuid: string): Promise<UserRolCompanyEntity[] | null>;
    getUserRolesCompanyByCompanyUser(cmp_uuid: string, usr_uuid: string): Promise<UserRolCompanyEntity[] | null>;
}