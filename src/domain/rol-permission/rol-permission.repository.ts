import { RolPermissionEntity } from "./rol-permission.entity";

export interface RolPermissionRepository {
    getRolPermissions(): Promise<RolPermissionEntity[] | null>;
    findRolPermissionById(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null>;
    createRolPermission(rolPermission: RolPermissionEntity): Promise<RolPermissionEntity | null>;
    updateRolPermission(rol_uuid: string, per_uuid: string, rolPermission: RolPermissionEntity): Promise<RolPermissionEntity | null>;
    deleteRolPermission(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null>;
    existRolPermission(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null>;
    getRolPermissionsByRol(rol_uuid: string): Promise<RolPermissionEntity[] | null>;
    getRolPermissionsByPermission(per_uuid: string): Promise<RolPermissionEntity[] | null>;
}