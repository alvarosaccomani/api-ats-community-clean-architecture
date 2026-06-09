export interface ResourceTypeEntity {
    rety_uuid: string,
    rety_name: string,
    rety_description: string,
    rety_createdat: Date,
    rety_updatedat: Date
}

//Update
export type ResourceTypeUpdateData = Pick<ResourceTypeEntity, 'rety_name' | 'rety_description'>
