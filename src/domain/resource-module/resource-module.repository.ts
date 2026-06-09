import { ResourceModuleEntity, ResourceModuleUpdateData } from "./resource-module.entity";

export interface ResourceModuleRepository {
    getResourceModules(): Promise<ResourceModuleEntity[] | null>;
    findResourceModuleById(remo_uuid: string): Promise<ResourceModuleEntity | null>;
    createResourceModule(resourceModule: ResourceModuleEntity): Promise<ResourceModuleEntity | null>;
    updateResourceModule(remo_uuid: string, resourceModule: ResourceModuleUpdateData): Promise<ResourceModuleEntity | null>;
    deleteResourceModule(remo_uuid: string): Promise<ResourceModuleEntity | null>;
    findResourceModuleByName(remo_name: string, excludeUuid?: string | null): Promise<ResourceModuleEntity | null>;
}