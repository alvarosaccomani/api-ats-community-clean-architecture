import { CurrencyEntity, CurrencyUpdateData } from "./currency.entity";

export interface CurrencyRepository {
    getCurrencies(): Promise<CurrencyEntity[] | null>;
    findCurrencyById(cur_uuid: string): Promise<CurrencyEntity | null>;
    createCurrency(currency: CurrencyEntity): Promise<CurrencyEntity | null>;
    updateCurrency(cur_uuid: string, currency: CurrencyUpdateData): Promise<CurrencyEntity | null>;
    deleteCurrency(cur_uuid: string): Promise<CurrencyEntity | null>;
    findCurrencyByName(cur_code: string, cur_name: string): Promise<CurrencyEntity | null>;
}