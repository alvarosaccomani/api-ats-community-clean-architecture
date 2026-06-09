import { PermissionRepository } from "../../domain/permission/permission.repository";
import { PermissionValue } from "../../domain/permission/permission.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class PermissionUseCase {
    constructor(
        private readonly permissionRepository: PermissionRepository
    ) {
        this.getPermissions = this.getPermissions.bind(this);
        this.getDetailPermission = this.getDetailPermission.bind(this);
        this.createPermission = this.createPermission.bind(this);
        this.updatePermission = this.updatePermission.bind(this);
        this.deletePermission = this.deletePermission.bind(this);
        this.findPermissionBySlug = this.findPermissionBySlug.bind(this);
    }

    public async getPermissions() {
        try {
            const permissions = await this.permissionRepository.getPermissions();
            if(!permissions) {
                throw new Error('No hay permisos.');
            }
            return permissions.map(permission => ({
                per_uuid: permission.per_uuid,
                per_slug: permission.per_slug,
                per_description: permission.per_description,
                rety_uuid: permission.rety_uuid,
                rety: permission.rety,
                remo_uuid: permission.remo_uuid,
                remo: permission.remo,
                per_createdat: TimezoneConverter.toIsoStringInTimezone(permission.per_createdat, 'America/Buenos_Aires'),
                per_updatedat: TimezoneConverter.toIsoStringInTimezone(permission.per_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getPermissions (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailPermission(per_uuid: string) {
        try {
            const permission = await this.permissionRepository.findPermissionById(per_uuid);
            if(!permission) {
                throw new Error(`No hay permisos con el Id: ${per_uuid}`);
            }
            return {
                per_uuid: permission.per_uuid,
                per_slug: permission.per_slug,
                per_description: permission.per_description,
                rety_uuid: permission.rety_uuid,
                rety: permission.rety,
                remo_uuid: permission.remo_uuid,
                remo: permission.remo,
                per_createdat: TimezoneConverter.toIsoStringInTimezone(permission.per_createdat, 'America/Buenos_Aires'),
                per_updatedat: TimezoneConverter.toIsoStringInTimezone(permission.per_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createPermission({ per_uuid, per_slug, per_description, rety_uuid, remo_uuid } : { per_uuid: string, per_slug: string, per_description: string, rety_uuid: string, remo_uuid: string }) {
        try {
            const permissionValue = new PermissionValue({ per_uuid, per_slug, per_description, rety_uuid, remo_uuid });
            const permissionCreated = await this.permissionRepository.createPermission(permissionValue);
            if(!permissionCreated) {
                throw new Error(`No se pudo insertar el permiso.`);
            }
            return {
                per_uuid: permissionCreated.per_uuid,
                per_slug: permissionCreated.per_slug,
                per_description: permissionCreated.per_description,
                rety_uuid: permissionCreated.rety_uuid,
                remo_uuid: permissionCreated.remo_uuid,
                per_createdat: TimezoneConverter.toIsoStringInTimezone(permissionCreated.per_createdat, 'America/Buenos_Aires'),
                per_updatedat: TimezoneConverter.toIsoStringInTimezone(permissionCreated.per_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updatePermission(per_uuid: string, { per_slug, per_description, rety_uuid, remo_uuid } : { per_slug: string, per_description: string, rety_uuid: string, remo_uuid: string }) {
        try {
            const permissionUpdated = await this.permissionRepository.updatePermission(per_uuid, { per_slug, per_description, rety_uuid, remo_uuid });
            if(!permissionUpdated) {
                throw new Error(`No se pudo actualizar el permiso.`);
            }
            return {
                per_uuid: permissionUpdated.per_uuid,
                per_slug: permissionUpdated.per_slug,
                per_description: permissionUpdated.per_description,
                rety_uuid: permissionUpdated.rety_uuid,
                remo_uuid: permissionUpdated.remo_uuid,
                per_createdat: TimezoneConverter.toIsoStringInTimezone(permissionUpdated.per_createdat, 'America/Buenos_Aires'),
                per_updatedat: TimezoneConverter.toIsoStringInTimezone(permissionUpdated.per_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updatePermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deletePermission(per_uuid: string) {
        try {
            const permissionDeleted = await this.permissionRepository.deletePermission(per_uuid);
            if(!permissionDeleted) {
                throw new Error(`No se pudo eliminar el permiso.`);
            }
            return {
                per_uuid: permissionDeleted.per_uuid,
                per_slug: permissionDeleted.per_slug,
                per_description: permissionDeleted.per_description,
                rety_uuid: permissionDeleted.rety_uuid,
                remo_uuid: permissionDeleted.remo_uuid,
                per_createdat: TimezoneConverter.toIsoStringInTimezone(permissionDeleted.per_createdat, 'America/Buenos_Aires'),
                per_updatedat: TimezoneConverter.toIsoStringInTimezone(permissionDeleted.per_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deletePermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findPermissionBySlug(per_slug: string, excludeUuid?: string) {
        try {
            const permission = await this.permissionRepository.findPermissionBySlug(per_slug, excludeUuid)
            if(permission) {
                throw new Error(`Ya existe un permiso con el slug ${per_slug}.`);
            }
            return permission
        } catch (error: any) {
            console.error('Error en findPermissionBySlug (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}