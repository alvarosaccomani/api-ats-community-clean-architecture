import { PermissionEntity, PermissionUpdateData } from "./permission.entity";

export interface PermissionRepository {
    getPermissions(): Promise<PermissionEntity[] | null>;
    findPermissionById(per_uuid: string): Promise<PermissionEntity | null>;
    createPermission(permission: PermissionEntity): Promise<PermissionEntity | null>;
    updatePermission(per_uuid: string, permission: PermissionUpdateData): Promise<PermissionEntity | null>;
    deletePermission(per_uuid: string): Promise<PermissionEntity | null>;
    findPermissionBySlug(per_slug: string, excludeUuid?: string | null): Promise<PermissionEntity | null>;
}