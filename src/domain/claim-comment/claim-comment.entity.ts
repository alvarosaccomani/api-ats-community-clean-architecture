export interface ClaimCommentEntity {
    cmp_uuid: string;
    cla_uuid: string;
    clac_uuid: string;
    usr_uuid: string;
    clac_text: string;
    clac_createdat: Date;
    usr?: {
        usr_uuid?: string;
        usr_name: string;
        usr_surname: string;
        usr_email: string;
    };
}
