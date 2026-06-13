import { TenderOptionEntity, TenderOptionUpdateData } from "./tender-option.entity";

export interface TenderOptionRepository {
    getTenderOptions(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderOptionEntity[] | null>;
    findTenderOptionById(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string): Promise<TenderOptionEntity | null>;
    createTenderOption(TenderOption: TenderOptionEntity): Promise<TenderOptionEntity | null>;
    updateTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string, TenderOption: TenderOptionUpdateData): Promise<TenderOptionEntity | null>;
    deleteTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string): Promise<TenderOptionEntity | null>;
}