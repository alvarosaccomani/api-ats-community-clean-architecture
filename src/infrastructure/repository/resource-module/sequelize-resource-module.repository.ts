import { ResourceModuleEntity, ResourceModuleUpdateData } from "../../../domain/resource-module/resource-module.entity";
import { ResourceModuleRepository } from "../../../domain/resource-module/resource-module.repository";
import { SequelizeResourceModule } from "../../model/resource-module/resource-module.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ResourceModuleRepository {
    async getResourceModules(): Promise<ResourceModuleEntity[] | null> {
        try {
            const resourceModules = await SequelizeResourceModule.findAll();
            if(!resourceModules) {
                throw new Error(`No hay módulos de recurso`)
            };
            return resourceModules;
        } catch (error: any) {
            console.error('Error en getResourceModules:', error.message);
            throw error;
        }
    }
    async findResourceModuleById(remo_uuid: string): Promise<ResourceModuleEntity | null> {
        try {
            const resourceModule = await SequelizeResourceModule.findOne({ 
                where: { 
                    remo_uuid: remo_uuid ?? null
                } 
            });
            if(!resourceModule) {
                throw new Error(`No hay módulo de recurso con el Id: ${remo_uuid}`);
            };
            return resourceModule.dataValues;
        } catch (error: any) {
            console.error('Error en findResourceModuleById:', error.message);
            throw error;
        }
    }
    async createResourceModule(resourceModule: ResourceModuleEntity): Promise<ResourceModuleEntity | null> {
        try {
            let { remo_uuid, remo_name, remo_description, remo_createdat, remo_updatedat } = resourceModule
            const result = await SequelizeResourceModule.create({ remo_uuid, remo_name, remo_description, remo_createdat, remo_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el módulo de recurso`);
            }
            let newResourceModule = result.dataValues as SequelizeResourceModule
            return newResourceModule;
        } catch (error: any) {
            console.error('Error en createResourceModule:', error.message);
            throw error;
        }
    }
    async updateResourceModule(remo_uuid: string, resourceModule: ResourceModuleUpdateData): Promise<ResourceModuleEntity | null> {
        try {
            const [updatedCount, [updatedResourceModule]] = await SequelizeResourceModule.update(
                { 
                    remo_name: resourceModule.remo_name,
                    remo_description: resourceModule.remo_description
                }, 
                { 
                    where: { remo_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el módulo de recurso`);
            };
            return updatedResourceModule.get({ plain: true }) as ResourceModuleEntity;
        } catch (error: any) {
            console.error('Error en updateResourceModule:', error.message);
            throw error;
        }
    }
    async deleteResourceModule(remo_uuid: string): Promise<ResourceModuleEntity | null> {
        try {
            const resourceModule = await this.findResourceModuleById(remo_uuid);
            const result = await SequelizeResourceModule.destroy({ where: { remo_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el módulo de recurso`);
            };
            return resourceModule;
        } catch (error: any) {
            console.error('Error en deleteResourceModule:', error.message);
            throw error;
        }
    }
    async findResourceModuleByName(remo_name: string, excludeUuid?: string): Promise<ResourceModuleEntity | null> {
        try {
            const whereCondition: any = { remo_name: remo_name ?? null };
            if (excludeUuid) {
                whereCondition.remo_uuid = { [Op.ne]: excludeUuid };
            }
            const resourceModule = await SequelizeResourceModule.findOne({ 
                where: whereCondition
            });
            return resourceModule;
        } catch (error: any) {
            console.error('Error en findResourceModuleByName:', error.message);
            throw error;
        }
    }
    
}