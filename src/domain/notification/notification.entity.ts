export interface NotificationEntity {
    usr_uuid: string,
    ntf_uuid: string,
    cmp_uuid: string,
    ntf_title: string,
    ntf_message: string,
    ntf_type: string,
    ntf_isread: boolean,
    ntf_actionurl: string,   
    ntf_createdat: Date
}

//Update
export type NotificationUpdateData = Pick<NotificationEntity, 'cmp_uuid' | 'ntf_title' | 'ntf_message' | 'ntf_type' | 'ntf_isread'>;
