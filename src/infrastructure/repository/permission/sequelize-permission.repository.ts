import { PermissionEntity, PermissionUpdateData } from "../../../domain/permission/permission.entity";
import { PermissionRepository } from "../../../domain/permission/permission.repository";
import { SequelizePermission } from "../../model/permission/permission.model";
import { Op } from "sequelize";
import { SequelizeResourceType } from "../../model/resource-type/resource-type.model";
import { SequelizeResourceModule } from "../../model/resource-module/resource-module.model";

export class SequelizeRepository implements PermissionRepository {
    async getPermissions(): Promise<PermissionEntity[] | null> {
        try {
            const permissions = await SequelizePermission.findAll({
                include: [
                    {
                        as: 'rety',
                        model: SequelizeResourceType
                    },
                    {
                        as: 'remo',
                        model: SequelizeResourceModule
                    }
                ]
            });
            if(!permissions) {
                throw new Error(`No hay permisos`)
            };
            return permissions;
        } catch (error: any) {
            console.error('Error en getPermissions:', error.message);
            throw error;
        }
    }
    async findPermissionById(per_uuid: string): Promise<PermissionEntity | null> {
        try {
            const permission = await SequelizePermission.findOne({ 
                where: { 
                    per_uuid: per_uuid ?? null
                },
                include: [
                    {
                        as: 'rety',
                        model: SequelizeResourceType
                    },
                    {
                        as: 'remo',
                        model: SequelizeResourceModule
                    }
                ]
            });
            if(!permission) {
                throw new Error(`No hay permiso con el Id: ${per_uuid}`);
            };
            return permission.dataValues;
        } catch (error: any) {
            console.error('Error en findPermissionById:', error.message);
            throw error;
        }
    }
    async createPermission(permission: PermissionEntity): Promise<PermissionEntity | null> {
        try {
            let { per_uuid, per_slug, per_description, rety_uuid, remo_uuid, per_createdat, per_updatedat } = permission
            const result = await SequelizePermission.create({ per_uuid, per_slug, per_description, rety_uuid, remo_uuid, per_createdat, per_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el permiso`);
            }
            let newPermission = result.dataValues as SequelizePermission
            return newPermission;
        } catch (error: any) {
            console.error('Error en createPermission:', error.message);
            throw error;
        }
    }
    async updatePermission(per_uuid: string, permission: PermissionUpdateData): Promise<PermissionEntity | null> {
        try {
            const [updatedCount, [updatedPermission]] = await SequelizePermission.update(
                { 
                    per_slug: permission.per_slug, 
                    per_description: permission.per_description, 
                    rety_uuid: permission.rety_uuid, 
                    remo_uuid: permission.remo_uuid
                },
                { 
                    where: { per_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el permiso`);
            };
            return updatedPermission.get({ plain: true }) as PermissionEntity;
        } catch (error: any) {
            console.error('Error en updatePermission:', error.message);
            throw error;
        }
    }
    async deletePermission(per_uuid: string): Promise<PermissionEntity | null> {
        try {
            const permission = await this.findPermissionById(per_uuid);
            const result = await SequelizePermission.destroy({ where: { per_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el permiso`);
            };
            return permission;
        } catch (error: any) {
            console.error('Error en deletePermission:', error.message);
            throw error;
        }
    }
    async findPermissionBySlug(per_slug: string, excludeUuid?: string): Promise<PermissionEntity | null> {
        try {
            const whereCondition: any = { 
                per_slug: per_slug ?? null
             };
            if (excludeUuid) {
                whereCondition.per_uuid = { [Op.ne]: excludeUuid };
            }
            const permission = await SequelizePermission.findOne({ 
                where: whereCondition
            });
            return permission;
        } catch (error: any) {
            console.error('Error en findPermissionBySlug:', error.message);
            throw error;
        }
    }
    
}