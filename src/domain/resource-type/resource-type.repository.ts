import { ResourceTypeEntity, ResourceTypeUpdateData } from "./resource-type.entity";

export interface ResourceTypeRepository {
    getResourceTypes(): Promise<ResourceTypeEntity[] | null>;
    findResourceTypeById(rety_uuid: string): Promise<ResourceTypeEntity | null>;
    createResourceType(resourceType: ResourceTypeEntity): Promise<ResourceTypeEntity | null>;
    updateResourceType(rety_uuid: string, resourceType: ResourceTypeUpdateData): Promise<ResourceTypeEntity | null>;
    deleteResourceType(rety_uuid: string): Promise<ResourceTypeEntity | null>;
    findResourceTypeByName(rety_name: string, excludeUuid?: string | null): Promise<ResourceTypeEntity | null>;
}