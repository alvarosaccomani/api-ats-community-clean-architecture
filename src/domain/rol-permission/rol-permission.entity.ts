import { RolEntity } from "../rol/rol.entity";
import { PermissionEntity } from "../permission/permission.entity";

export interface RolPermissionEntity {
    rol_uuid: string,
    rol?: RolEntity,
    per_uuid: string,
    per?: PermissionEntity,
    rolper_createdat: Date,
    rolper_updatedat: Date
}