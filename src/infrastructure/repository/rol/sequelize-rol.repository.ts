import { RolEntity, RolUpdateData } from "../../../domain/rol/rol.entity";
import { RolRepository } from "../../../domain/rol/rol.repository";
import { SequelizeRol } from "../../model/rol/rol.model";
import { Op } from "sequelize";

export class SequelizeRepository implements RolRepository {
    async getRoles(): Promise<RolEntity[] | null> {
        try {
            const roles = await SequelizeRol.findAll();
            if(!roles) {
                throw new Error(`No hay roles`)
            };
            return roles;
        } catch (error: any) {
            console.error('Error en getRoles:', error.message);
            throw error;
        }
    }
    async findRolById(rol_uuid: string): Promise<RolEntity | null> {
        try {
            const rol = await SequelizeRol.findOne({ 
                where: { 
                    rol_uuid: rol_uuid ?? null
                } 
            });
            if(!rol) {
                throw new Error(`No hay rol con el Id: ${rol_uuid}`);
            };
            return rol.dataValues;
        } catch (error: any) {
            console.error('Error en findRolById:', error.message);
            throw error;
        }
    }
    async createRol(rol: RolEntity): Promise<RolEntity | null> {
        try {
            let { rol_uuid, rol_name, rol_createdat, rol_updatedat } = rol
            const result = await SequelizeRol.create({ rol_uuid, rol_name, rol_createdat, rol_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el rol`);
            }
            let newRol = result.dataValues as SequelizeRol
            return newRol;
        } catch (error: any) {
            console.error('Error en createRol:', error.message);
            throw error;
        }
    }
    async updateRol(rol_uuid: string, rol: RolUpdateData): Promise<RolEntity | null> {
        try {
            const [updatedCount, [updatedRol]] = await SequelizeRol.update(
                {
                    rol_name: rol.rol_name
                },
                {
                    where: { rol_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el rol`);
            }
            return updatedRol.get({ plain: true }) as RolEntity;
        } catch (error: any) {
            console.error('Error en updateRol:', error.message);
            throw error;
        }
    }
    async deleteRol(rol_uuid: string): Promise<RolEntity | null> {
        try {
            const rol = await this.findRolById(rol_uuid);
            const result = await SequelizeRol.destroy({ where: { rol_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el rol`);
            };
            return rol;
        } catch (error: any) {
            console.error('Error en deleteRol:', error.message);
            throw error;
        }
    }
    async findRolByName(rol_name: string, excludeUuid?: string): Promise<RolEntity | null> {
        try {
            const whereCondition: any = { rol_name: rol_name ?? null };
            if (excludeUuid) {
                whereCondition.rol_uuid = { [Op.ne]: excludeUuid };
            }
            const rol = await SequelizeRol.findOne({ 
                where: whereCondition
            });
            return rol;
        } catch (error: any) {
            console.error('Error en findRolByName:', error.message);
            throw error;
        }
    }
    
}