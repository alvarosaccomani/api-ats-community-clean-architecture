import { TenderEntity, TenderUpdateData } from "./tender.entity";

export interface TenderRepository {
    getTenders(cmp_uuid: string, cla_uuid: string): Promise<TenderEntity[] | null>;
    findTenderById(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderEntity | null>;
    createTender(Tender: TenderEntity): Promise<TenderEntity | null>;
    updateTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string, Tender: TenderUpdateData): Promise<TenderEntity | null>;
    deleteTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderEntity | null>;
}