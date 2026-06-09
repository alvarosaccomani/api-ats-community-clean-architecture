import { RolPermissionRepository } from "../../domain/rol-permission/rol-permission.repository";
import { RolPermissionValue } from "../../domain/rol-permission/rol-permission.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class RolPermissionUseCase {
    constructor(
        private readonly rolPermissionRepository: RolPermissionRepository
    ) {
        this.getRolPermissions = this.getRolPermissions.bind(this);
        this.getDetailRolPermission = this.getDetailRolPermission.bind(this);
        this.createRolPermission = this.createRolPermission.bind(this);
        this.updateRolPermission = this.updateRolPermission.bind(this);
        this.deleteRolPermission = this.deleteRolPermission.bind(this);
        this.getRolPermissionsByRol = this.getRolPermissionsByRol.bind(this);
        this.getRolPermissionsByPermission = this.getRolPermissionsByPermission.bind(this);
    }

    public async getRolPermissions() {
        try {
            const rolPermissions = await this.rolPermissionRepository.getRolPermissions();
            if(!rolPermissions) {
                throw new Error('No hay permisos de rol.');
            }
            return rolPermissions.map((rolPermission) => ({
                rol_uuid: rolPermission.rol_uuid,
                rol: rolPermission.rol,
                per_uuid: rolPermission.per_uuid,
                per: rolPermission.per,
                rolper_createdat: TimezoneConverter.toIsoStringInTimezone(rolPermission.rolper_createdat, 'America/Argentina/Buenos_Aires'),
                rolper_updatedat: TimezoneConverter.toIsoStringInTimezone(rolPermission.rolper_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getRolPermissions (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailRolPermission(rol_uuid: string, per_uuid: string) {
        try {
            const rolPermission = await this.rolPermissionRepository.findRolPermissionById(rol_uuid, per_uuid);
            if(!rolPermission) {
                throw new Error(`No hay permiso de rol con el Id: ${rol_uuid}, ${per_uuid}`);
            }
            return {
                rol_uuid: rolPermission.rol_uuid,
                rol: rolPermission.rol,
                per_uuid: rolPermission.per_uuid,
                per: rolPermission.per,
                rolper_createdat: TimezoneConverter.toIsoStringInTimezone(rolPermission.rolper_createdat, 'America/Argentina/Buenos_Aires'),
                rolper_updatedat: TimezoneConverter.toIsoStringInTimezone(rolPermission.rolper_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailRolPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createRolPermission({ rol_uuid, per_uuid, rolper_createdat, rolper_updatedat } : { rol_uuid: string, per_uuid: string, rolper_createdat: Date, rolper_updatedat: Date }) {
        try {
            const rolPermissionValue = new RolPermissionValue({ rol_uuid, per_uuid, rolper_createdat, rolper_updatedat });
            const rolPermissionCreated = await this.rolPermissionRepository.createRolPermission(rolPermissionValue);
            if(!rolPermissionCreated) {
                throw new Error(`No se pudo insertar el permiso de rol.`);
            }
            return {
                rol_uuid: rolPermissionCreated.rol_uuid,
                per_uuid: rolPermissionCreated.per_uuid,
                rolper_createdat: TimezoneConverter.toIsoStringInTimezone(rolPermissionCreated.rolper_createdat, 'America/Argentina/Buenos_Aires'),
                rolper_updatedat: TimezoneConverter.toIsoStringInTimezone(rolPermissionCreated.rolper_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createRolPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateRolPermission(rol_uuid: string, per_uuid: string,{ rolper_createdat, rolper_updatedat } : { rol_uuid: string, per_uuid: string, rolper_createdat: Date, rolper_updatedat: Date }) {
        try {
            const rolPermissionUpdated = await this.rolPermissionRepository.updateRolPermission(rol_uuid, per_uuid, { rol_uuid, per_uuid, rolper_createdat, rolper_updatedat });
            if(!rolPermissionUpdated) {
                throw new Error(`No se pudo actualizar el permiso de rol.`);
            }
            return {
                rol_uuid: rolPermissionUpdated.rol_uuid,
                per_uuid: rolPermissionUpdated.per_uuid,
                rolper_createdat: TimezoneConverter.toIsoStringInTimezone(rolPermissionUpdated.rolper_createdat, 'America/Argentina/Buenos_Aires'),
                rolper_updatedat: TimezoneConverter.toIsoStringInTimezone(rolPermissionUpdated.rolper_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateRolPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteRolPermission(rol_uuid: string, per_uuid: string) {
        try {
            const rolPermissionDeleted = await this.rolPermissionRepository.deleteRolPermission(rol_uuid, per_uuid);
            if(!rolPermissionDeleted) {
                throw new Error(`No se pudo eliminar el permiso de rol.`);
            }
            return {
                rol_uuid: rolPermissionDeleted.rol_uuid,
                per_uuid: rolPermissionDeleted.per_uuid,
                rolper_createdat: TimezoneConverter.toIsoStringInTimezone(rolPermissionDeleted.rolper_createdat, 'America/Argentina/Buenos_Aires'),
                rolper_updatedat: TimezoneConverter.toIsoStringInTimezone(rolPermissionDeleted.rolper_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteRolPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existRolPermission(rol_uuid: string, per_uuid: string) {
        try {
            const rolPermission = this.rolPermissionRepository.existRolPermission(rol_uuid, per_uuid);
            return rolPermission;
        } catch (error: any) {
            console.error('Error en existRolPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getRolPermissionsByRol(rol_uuid: string) {
        try {
            const rolPermissions = this.rolPermissionRepository.getRolPermissionsByRol(rol_uuid);
            return rolPermissions;
        } catch (error: any) {
            console.error('Error en getRolPermissionsByRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getRolPermissionsByPermission(per_uuid: string) {
        try {
            const rolPermissions = this.rolPermissionRepository.getRolPermissionsByPermission(per_uuid);
            return rolPermissions;
        } catch (error: any) {
            console.error('Error en getRolPermissionsByPermission (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}