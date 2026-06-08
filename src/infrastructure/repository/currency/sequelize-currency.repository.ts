import { CurrencyEntity, CurrencyUpdateData } from "../../../domain/currency/currency.entity";
import { CurrencyRepository } from "../../../domain/currency/currency.repository";
import { SequelizeCurrency } from "../../model/currency/currency.model";

export class SequelizeRepository implements CurrencyRepository {
    async getCurrencies(): Promise<CurrencyEntity[] | null> {
        try {
            const currencies = await SequelizeCurrency.findAll();
            if(!currencies) {
                throw new Error(`No hay monedas`);
            };
            return currencies;
        } catch (error: any) {
            console.error('Error en getCurrencies:', error.message);
            throw error;
        }
    }
    async findCurrencyById(cur_uuid: string): Promise<CurrencyEntity | null> {
        try {
            const currency = await SequelizeCurrency.findOne({ 
                where: { 
                    cur_uuid: cur_uuid ?? null
                }
            });
            if(!currency) {
                throw new Error(`No hay moneda con el Id: ${cur_uuid}`);
            };
            return currency;
        } catch (error: any) {
            console.error('Error en findCurrencyById:', error.message);
            throw error;
        }
    }
    async createCurrency(currency: CurrencyEntity): Promise<CurrencyEntity | null> {
        try {
            let { cur_uuid, cur_code, cur_symbol, cur_name, cur_description, cur_image, cur_createdat, cur_updatedat } = currency
            const result = await SequelizeCurrency.create({ cur_uuid, cur_code, cur_symbol, cur_name, cur_description, cur_image, cur_createdat, cur_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la moneda`);
            }
            let newCurrency = result.dataValues as SequelizeCurrency
            return newCurrency;
        } catch (error: any) {
            console.error('Error en createCurrency:', error.message);
            throw error;
        }
    }
    async updateCurrency(cur_uuid: string, currency: CurrencyUpdateData): Promise<CurrencyEntity | null> {
        try {
            const [updatedCount, [updatedCurrency]] = await SequelizeCurrency.update(
                { 
                    cur_code: currency.cur_code, 
                    cur_symbol: currency.cur_symbol, 
                    cur_name: currency.cur_name, 
                    cur_description: currency.cur_description, 
                    cur_image: currency.cur_image
                },
                { 
                    where: { cur_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la moneda`);
            };
            return updatedCurrency.get({ plain: true }) as CurrencyEntity;
        } catch (error: any) {
            console.error('Error en updateCurrency:', error.message);
            throw error;
        }
    }
    async deleteCurrency(cur_uuid: string): Promise<CurrencyEntity | null> {
        try {
            const currency = await this.findCurrencyById(cur_uuid);
            const result = await SequelizeCurrency.destroy({ where: { cur_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la moneda`);
            };
            return currency;
        } catch (error: any) {
            console.error('Error en deleteCurrency:', error.message);
            throw error;
        }
    }

    async findCurrencyByName(cur_code: string, cur_name: string): Promise<CurrencyEntity | null> {
        try {
            const currency = await SequelizeCurrency.findOne({ 
                where: { 
                    cur_code: cur_code,
                    cur_name: cur_name
                }
            });
            if(!currency) {
                throw new Error(`No hay moneda con el nombre: ${cur_code} - ${cur_name}`);
            };
            return currency;
        } catch (error: any) {
            console.error('Error en findCurrencyByName:', error.message);
            throw error;
        }
    }
    
}