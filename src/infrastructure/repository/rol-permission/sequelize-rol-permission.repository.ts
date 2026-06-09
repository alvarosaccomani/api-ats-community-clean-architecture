import { RolPermissionEntity } from "../../../domain/rol-permission/rol-permission.entity";
import { RolPermissionRepository } from "../../../domain/rol-permission/rol-permission.repository";
import { SequelizeRolPermission } from "../../model/rol-permission/rol-permission.model";
import { SequelizePermission } from "../../model/permission/permission.model";
import { SequelizeRol } from "../../model/rol/rol.model";

export class SequelizeRepository implements RolPermissionRepository {
    async getRolPermissions(): Promise<RolPermissionEntity[] | null> {
        try {
            const rolPermissions = await SequelizeRolPermission.findAll({ 
                /*where: { 
                    cmp_uuid: cmp_uuid ?? null
                },*/
                include: [
                    { as: 'rol', model: SequelizeRol },
                    { as: 'per', model: SequelizePermission }
                ]
            });
            if(!rolPermissions) {
                throw new Error(`No hay permisos de rol`)
            };
            return rolPermissions;
        } catch (error: any) {
            console.error('Error en getRolPermissions:', error.message);
            throw error;
        }
    }
    async findRolPermissionById(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null> {
        try {
            const rolPermission = await SequelizeRolPermission.findOne({ 
                where: { 
                    rol_uuid: rol_uuid ?? null,
                    per_uuid: per_uuid ?? null,
                }
            });
            if(!rolPermission) {
                throw new Error(`No hay permiso de rol con el Id: ${rol_uuid}`);
            };
            return rolPermission.dataValues;
        } catch (error: any) {
            console.error('Error en findRolPermissionById:', error.message);
            throw error;
        }
    }
    async createRolPermission(rolPermission: RolPermissionEntity): Promise<RolPermissionEntity | null> {
        try {
            let { per_uuid, rol_uuid, rolper_createdat, rolper_updatedat } = rolPermission
            const result = await SequelizeRolPermission.create({ per_uuid, rol_uuid, rolper_createdat, rolper_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el permiso de rol`);
            }
            let newRolPermission = result.dataValues as SequelizeRolPermission
            return newRolPermission;
        } catch (error: any) {
            console.error('Error en createRolPermission:', error.message);
            throw error;
        }
    }
    async updateRolPermission(rol_uuid: string, per_uuid: string, rolPermission: RolPermissionEntity): Promise<RolPermissionEntity | null> {
        try {
            let { rolper_createdat, rolper_updatedat } = rolPermission
            const result = await SequelizeRolPermission.update({ rolper_createdat, rolper_updatedat }, { where: { rol_uuid, per_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el permiso de rol`);
            };
            return rolPermission;
        } catch (error: any) {
            console.error('Error en updateRolPermission:', error.message);
            throw error;
        }
    }
    async deleteRolPermission(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null> {
        try {
            const rolPermission = await this.findRolPermissionById(rol_uuid, per_uuid);
            const result = await SequelizeRolPermission.destroy({ where: { rol_uuid, per_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el permiso de rol`);
            };
            return rolPermission;
        } catch (error: any) {
            console.error('Error en deleteRolPermission:', error.message);
            throw error;
        }
    }
    async existRolPermission(rol_uuid: string, per_uuid: string): Promise<RolPermissionEntity | null> {
        try {
            const rolPermission = await SequelizeRolPermission.findOne({ 
                where: { 
                    rol_uuid: rol_uuid ?? null,
                    per_uuid: per_uuid ?? null
                } 
            });
            return rolPermission;
        } catch (error: any) {
            console.error('Error en existRolPermission:', error.message);
            throw error;
        }
    }
    async getRolPermissionsByRol(rol_uuid: string): Promise<RolPermissionEntity[] | null> {
        try {
            let config = {
                where: {},
                include: [
                    { as: 'per', model: SequelizePermission }
                ]
            }
            if (rol_uuid && rol_uuid !== 'null') {
                config.where = { 
                    rol_uuid: rol_uuid
                }
            }
            const rolPermissions = await SequelizeRolPermission.findAll(config);
            if(!rolPermissions) {
                throw new Error(`No hay permiso de rol con el Id: ${rol_uuid}`);
            }
            return rolPermissions;
        } catch (error: any) {
            console.error('Error en getRolPermissionsByRol:', error.message);
            throw error;
        }
    }

    async getRolPermissionsByPermission(per_uuid: string): Promise<RolPermissionEntity[] | null> {
        try {
            let config = {
                where: {
                    per_uuid: per_uuid
                },
                include: [
                    { as: 'rol', model: SequelizeRol }
                ]
            }

            const rolPermissions = await SequelizeRolPermission.findAll(config);
            if(!rolPermissions) {
                throw new Error(`No hay permiso de rol con el Id: ${per_uuid}`);
            }
            return rolPermissions;
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByCompanyUser:', error.message);
            throw error;
        }        
    }
    
}