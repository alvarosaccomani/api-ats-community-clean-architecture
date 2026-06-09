import { ResourceTypeRepository } from "../../domain/resource-type/resource-type.repository";
import { ResourceTypeValue } from "../../domain/resource-type/resource-type.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ResourceTypeUseCase {
    constructor(
        private readonly resourceTypeRepository: ResourceTypeRepository
    ) {
        this.getResourceTypes = this.getResourceTypes.bind(this);
        this.getDetailResourceType = this.getDetailResourceType.bind(this);
        this.createResourceType = this.createResourceType.bind(this);
        this.updateResourceType = this.updateResourceType.bind(this);
        this.deleteResourceType = this.deleteResourceType.bind(this);
        this.findResourceTypeByName = this.findResourceTypeByName.bind(this);
    }

    public async getResourceTypes() {
        try {
            const resourceTypes = await this.resourceTypeRepository.getResourceTypes();
            if(!resourceTypes) {
                throw new Error('No hay tipos de recurso.');
            }
            return resourceTypes.map(resourceType => ({
                rety_uuid: resourceType.rety_uuid,
                rety_name: resourceType.rety_name,
                rety_description: resourceType.rety_description,
                rety_createdat: TimezoneConverter.toIsoStringInTimezone(resourceType.rety_createdat, 'America/Argentina/Buenos_Aires'),
                rety_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceType.rety_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getResourceTypes (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailResourceType(rety_uuid: string) {
        try {
            const resourceType = await this.resourceTypeRepository.findResourceTypeById(rety_uuid);
            if(!resourceType) {
                throw new Error(`No hay tipo de recurso con el Id: ${rety_uuid}`);
            }
            return {
                rety_uuid: resourceType.rety_uuid,
                rety_name: resourceType.rety_name,
                rety_description: resourceType.rety_description,
                rety_createdat: TimezoneConverter.toIsoStringInTimezone(resourceType.rety_createdat, 'America/Argentina/Buenos_Aires'),
                rety_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceType.rety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailResourceType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createResourceType({ rety_uuid, rety_name, rety_description } : { rety_uuid: string, rety_name: string, rety_description: string }) {
        try {
            const resourceTypeValue = new ResourceTypeValue({ rety_uuid, rety_name, rety_description });
            const resourceTypeCreated = await this.resourceTypeRepository.createResourceType(resourceTypeValue);
            if(!resourceTypeCreated) {
                throw new Error(`No se pudo insertar el tipo de recurso.`);
            }
            return {
                rety_uuid: resourceTypeCreated.rety_uuid,
                rety_name: resourceTypeCreated.rety_name,
                rety_description: resourceTypeCreated.rety_description,
                rety_createdat: TimezoneConverter.toIsoStringInTimezone(resourceTypeCreated.rety_createdat, 'America/Argentina/Buenos_Aires'),
                rety_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceTypeCreated.rety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createResourceType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateResourceType(rety_uuid: string, { rety_name, rety_description } : { rety_name: string, rety_description: string }) {
        try {
            const resourceTypeUpdated = await this.resourceTypeRepository.updateResourceType(rety_uuid, { rety_name, rety_description });
            if(!resourceTypeUpdated) {
                throw new Error(`No se pudo actualizar el tipo de recurso.`);
            }
            return {
                rety_uuid: resourceTypeUpdated.rety_uuid,
                rety_name: resourceTypeUpdated.rety_name,
                rety_description: resourceTypeUpdated.rety_description,
                rety_createdat: TimezoneConverter.toIsoStringInTimezone(resourceTypeUpdated.rety_createdat, 'America/Argentina/Buenos_Aires'),
                rety_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceTypeUpdated.rety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateResourceType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteResourceType(rety_uuid: string) {
        try {
            const resourceTypeDeleted = await this.resourceTypeRepository.deleteResourceType(rety_uuid);
            if(!resourceTypeDeleted) {
                throw new Error(`No se pudo eliminar el tipo de recurso.`);
            }
            return {
                rety_uuid: resourceTypeDeleted.rety_uuid,
                rety_name: resourceTypeDeleted.rety_name,
                rety_description: resourceTypeDeleted.rety_description,
                rety_createdat: TimezoneConverter.toIsoStringInTimezone(resourceTypeDeleted.rety_createdat, 'America/Argentina/Buenos_Aires'),
                rety_updatedat: TimezoneConverter.toIsoStringInTimezone(resourceTypeDeleted.rety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteResourceType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findResourceTypeByName(rety_name: string, excludeUuid?: string) {
        try {
            const resourceType = await this.resourceTypeRepository.findResourceTypeByName(rety_name, excludeUuid)
            if(resourceType) {
                throw new Error(`Ya existe un tipo de recurso con el nombre ${rety_name}.`);
            }
            return resourceType
        } catch (error: any) {
            console.error('Error en findResourceTypeByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}