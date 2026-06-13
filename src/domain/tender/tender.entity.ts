export interface TenderEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    ten_votingdeadline: Date;
    ten_status: 'Activa' | 'Cerrada' | 'Desierta';
    ten_createdat: Date;
    ten_updatedat: Date
}

//Update
export type TenderUpdateData = Pick<TenderEntity, 'ten_votingdeadline' | 'ten_status'>;