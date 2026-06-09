import { ResourceModuleEntity } from "../resource-module/resource-module.entity";
import { ResourceTypeEntity } from "../resource-type/resource-type.entity";

export interface PermissionEntity {
    per_uuid: string,
    per_slug: string,
    per_description: string,
    rety_uuid: string,
    rety?: ResourceTypeEntity,
    remo_uuid: string,   
    remo?: ResourceModuleEntity,
    per_createdat: Date,
    per_updatedat: Date
}

//Update
export type PermissionUpdateData = Pick<PermissionEntity, 'per_slug' | 'per_description' | 'rety_uuid' | 'remo_uuid'>;
