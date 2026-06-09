import { UserEntity } from "../user/user.entity";
import { RolEntity } from "../rol/rol.entity";

export interface UserRolCompanyEntity {
    cmp_uuid: string,
    usr_uuid: string,
    usr?: UserEntity,
    rol_uuid: string,
    rol?: RolEntity,
    usrrolcmp_createdat: Date,
    usrrolcmp_updatedat: Date

}