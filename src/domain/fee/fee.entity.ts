export interface FeeEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    fee_uuid: string;
    fee_period: string;
    fee_amount: number;
    fee_duedate: Date;
    fee_status: 'Pendiente' | 'Pagada' | 'Vencida';
    fee_createdat: Date
}

//Update
export type FeeUpdateData = Pick<FeeEntity, 'fee_period' | 'fee_amount' | 'fee_amount' | 'fee_duedate' | 'fee_status'>;