export interface CompanySettingEntity {
    cmp_uuid: string,
    cmps_uuid: string,
    cmps_key: string,
    cmps_parameter: string,
    cmps_description: string,
    cmps_value: string,
    cmps_datatype: string,
    cmps_options: string,
    cmps_group: string,
    cmps_createdat: Date,
    cmps_updatedat: Date
}

//Update
export type CompanySettingUpdateData = Pick<CompanySettingEntity, 'cmps_key' | 'cmps_parameter' | 'cmps_description' | 'cmps_value' | 'cmps_datatype' | 'cmps_options' | 'cmps_group'>;
