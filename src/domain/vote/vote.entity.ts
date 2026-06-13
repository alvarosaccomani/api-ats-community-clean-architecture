export interface VoteEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    usr_uuid: string;
    vto_uuid: string;
    tenopt_uuid: string;
    vto_createdat: Date
}

//Update
export type VoteUpdateData = Pick<VoteEntity, 'tenopt_uuid'>;