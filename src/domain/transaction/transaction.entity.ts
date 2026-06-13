export interface TransactionEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    fee_uuid: string;
    tra_uuid: string;
    tra_gatewayid: string;
    tra_totalamount: number;
    tra_platformfee: number;
    tra_recipientamount: number;
    tra_status: 'Approved' | 'Pending' | 'Rejected';
    tra_createdat: Date
}

//Update
export type TransactionUpdateData = Pick<TransactionEntity, 'tra_gatewayid' | 'tra_totalamount' | 'tra_platformfee' | 'tra_recipientamount' | 'tra_status'>;