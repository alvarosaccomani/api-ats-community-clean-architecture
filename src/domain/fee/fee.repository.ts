import { FeeEntity, FeeUpdateData } from "./fee.entity";

export interface FeeRepository {
    getFees(cmp_uuid: string, usr_uuid?: string, uni_uuid?: string, usruni_uuid?: string, filters?: any): Promise<FeeEntity[] | null>;
    findFeeById(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string): Promise<FeeEntity | null>;
    createFee(Fee: FeeEntity): Promise<FeeEntity | null>;
    updateFee(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, Fee: FeeUpdateData): Promise<FeeEntity | null>;
    deleteFee(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string): Promise<FeeEntity | null>;
}