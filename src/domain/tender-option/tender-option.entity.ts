export interface TenderOptionEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    tenopt_uuid: string;
    tenopt_providername: string;
    tenopt_amount: number;
    tenopt_details: string;
    tenopt_createdat: Date;
    tenopt_updatedat: Date
}

//Update
export type TenderOptionUpdateData = Pick<TenderOptionEntity, 'tenopt_providername' | 'tenopt_amount' | 'tenopt_details'>;