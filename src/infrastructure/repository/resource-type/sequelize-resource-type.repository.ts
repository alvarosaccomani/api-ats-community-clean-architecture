import { ResourceTypeEntity, ResourceTypeUpdateData } from "../../../domain/resource-type/resource-type.entity";
import { ResourceTypeRepository } from "../../../domain/resource-type/resource-type.repository";
import { SequelizeResourceType } from "../../model/resource-type/resource-type.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ResourceTypeRepository {
    async getResourceTypes(): Promise<ResourceTypeEntity[] | null> {
        try {
            const resourceTypes = await SequelizeResourceType.findAll();
            if(!resourceTypes) {
                throw new Error(`No hay tipos de recurso`)
            };
            return resourceTypes;
        } catch (error: any) {
            console.error('Error en getResourceTypes:', error.message);
            throw error;
        }
    }
    async findResourceTypeById(rety_uuid: string): Promise<ResourceTypeEntity | null> {
        try {
            const resourceType = await SequelizeResourceType.findOne({ 
                where: { 
                    rety_uuid: rety_uuid ?? null
                } 
            });
            if(!resourceType) {
                throw new Error(`No hay tipo de recurso con el Id: ${rety_uuid}`);
            };
            return resourceType.dataValues;
        } catch (error: any) {
            console.error('Error en findResourceTypeById:', error.message);
            throw error;
        }
    }
    async createResourceType(resourceType: ResourceTypeEntity): Promise<ResourceTypeEntity | null> {
        try {
            let { rety_uuid, rety_name, rety_description, rety_createdat, rety_updatedat } = resourceType
            const result = await SequelizeResourceType.create({ rety_uuid, rety_name, rety_description, rety_createdat, rety_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el tipo de recurso`);
            }
            let newResourceType = result.dataValues as SequelizeResourceType
            return newResourceType;
        } catch (error: any) {
            console.error('Error en createResourceType:', error.message);
            throw error;
        }
    }
    async updateResourceType(rety_uuid: string, resourceType: ResourceTypeUpdateData): Promise<ResourceTypeEntity | null> {
        try {
            const [updatedCount, [updatedResourceType]] = await SequelizeResourceType.update(
                { 
                    rety_name: resourceType.rety_name,
                    rety_description: resourceType.rety_description
                }, 
                { 
                    where: { rety_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el tipo de recurso`);
            };
            return updatedResourceType.get({ plain: true }) as ResourceTypeEntity;
        } catch (error: any) {
            console.error('Error en updateResourceType:', error.message);
            throw error;
        }
    }
    async deleteResourceType(rety_uuid: string): Promise<ResourceTypeEntity | null> {
        try {
            const resourceType = await this.findResourceTypeById(rety_uuid);
            const result = await SequelizeResourceType.destroy({ where: { rety_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el tipo de recurso`);
            };
            return resourceType;
        } catch (error: any) {
            console.error('Error en deleteResourceType:', error.message);
            throw error;
        }
    }
    async findResourceTypeByName(rety_name: string, excludeUuid?: string): Promise<ResourceTypeEntity | null> {
        try {
            const whereCondition: any = { rety_name: rety_name ?? null };
            if (excludeUuid) {
                whereCondition.rety_uuid = { [Op.ne]: excludeUuid };    
            }
            const resourceType = await SequelizeResourceType.findOne({ 
                where: whereCondition
            });
            return resourceType;
        } catch (error: any) {
            console.error('Error en findResourceTypeByName:', error.message);
            throw error;
        }
    }
    
}