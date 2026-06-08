import { CurrencyRepository } from "../../domain/currency/currency.repository";
import { CurrencyValue } from "../../domain/currency/currency.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CurrencyUseCase {
    constructor(
        private readonly currencyRepository: CurrencyRepository,
    ) {
        this.getCurrencies = this.getCurrencies.bind(this);
        this.getDetailCurrency = this.getDetailCurrency.bind(this);
        this.createCurrency = this.createCurrency.bind(this);
        this.updateCurrency = this.updateCurrency.bind(this);
        this.deleteCurrency = this.deleteCurrency.bind(this);
        this.findCurrencyByName = this.findCurrencyByName.bind(this);
    }

    public async getCurrencies() {
        try {
            const currencies = await this.currencyRepository.getCurrencies();
            if(!currencies) {
                throw new Error('No hay monedas.');
            }
            return currencies.map(currency => ({
                cur_uuid: currency.cur_uuid,
                cur_code: currency.cur_code,
                cur_symbol: currency.cur_symbol,
                cur_name: currency.cur_name,
                cur_description: currency.cur_description,
                cur_image: currency.cur_image,
                cur_createdat: TimezoneConverter.toIsoStringInTimezone(currency.cur_createdat, 'America/Buenos_Aires'),
                cur_updatedat: TimezoneConverter.toIsoStringInTimezone(currency.cur_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCurrencies (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCurrency(cur_uuid: string) {
        try {
            const currency = await this.currencyRepository.findCurrencyById(cur_uuid);
            if(!currency) {
                throw new Error(`No hay moneda con el Id: ${cur_uuid}`);
            }
            return {
                cur_uuid: currency.cur_uuid,
                cur_code: currency.cur_code,
                cur_symbol: currency.cur_symbol,
                cur_name: currency.cur_name,
                cur_description: currency.cur_description,
                cur_image: currency.cur_image,
                cur_createdat: TimezoneConverter.toIsoStringInTimezone(currency.cur_createdat, 'America/Buenos_Aires'),
                cur_updatedat: TimezoneConverter.toIsoStringInTimezone(currency.cur_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCurrency (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCurrency({ cur_uuid, cur_code, cur_symbol, cur_name, cur_description, cur_image } : { cur_uuid: string, cur_code: string, cur_symbol: string, cur_name: string, cur_description: string, cur_image: string }) {
        try {
            const currencyValue = new CurrencyValue({ cur_uuid, cur_code, cur_symbol, cur_name, cur_description, cur_image });
            const currencyCreated = await this.currencyRepository.createCurrency(currencyValue);
            if(!currencyCreated) {
                throw new Error(`No se pudo insertar la moneda.`);
            }
            return {
                cur_uuid: currencyCreated.cur_uuid,
                cur_code: currencyCreated.cur_code,
                cur_symbol: currencyCreated.cur_symbol,
                cur_name: currencyCreated.cur_name,
                cur_description: currencyCreated.cur_description,
                cur_image: currencyCreated.cur_image,
                cur_createdat: TimezoneConverter.toIsoStringInTimezone(currencyCreated.cur_createdat, 'America/Buenos_Aires'),
                cur_updatedat: TimezoneConverter.toIsoStringInTimezone(currencyCreated.cur_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCurrency (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCurrency({ cur_uuid, cur_code, cur_symbol, cur_name, cur_description, cur_image } : { cur_uuid: string, cur_code: string, cur_symbol: string, cur_name: string, cur_description: string, cur_image: string }) {
        try {
            const currencyUpdated = await this.currencyRepository.updateCurrency(cur_uuid, { cur_code, cur_symbol, cur_name, cur_description, cur_image });
            if(!currencyUpdated) {
                throw new Error(`No se pudo actualizar la moneda.`);
            }
            return {
                cur_uuid: currencyUpdated.cur_uuid,
                cur_code: currencyUpdated.cur_code,
                cur_symbol: currencyUpdated.cur_symbol,
                cur_name: currencyUpdated.cur_name,
                cur_description: currencyUpdated.cur_description,
                cur_image: currencyUpdated.cur_image,
                cur_createdat: TimezoneConverter.toIsoStringInTimezone(currencyUpdated.cur_createdat, 'America/Buenos_Aires'),
                cur_updatedat: TimezoneConverter.toIsoStringInTimezone(currencyUpdated.cur_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCurrency (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCurrency(cur_uuid: string) {
        try {
            const currencyDeleted = await this.currencyRepository.deleteCurrency(cur_uuid);
            if(!currencyDeleted) {
                throw new Error(`No se pudo eliminar la moneda.`);
            }
            return {
                cur_uuid: currencyDeleted.cur_uuid,
                cur_code: currencyDeleted.cur_code,
                cur_symbol: currencyDeleted.cur_symbol,
                cur_name: currencyDeleted.cur_name,
                cur_description: currencyDeleted.cur_description,
                cur_image: currencyDeleted.cur_image,
                cur_createdat: TimezoneConverter.toIsoStringInTimezone(currencyDeleted.cur_createdat, 'America/Buenos_Aires'),
                cur_updatedat: TimezoneConverter.toIsoStringInTimezone(currencyDeleted.cur_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteCurrency (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCurrencyByName(cur_code: string, cur_name: string) {
        try {
            const currency = await this.currencyRepository.findCurrencyByName(cur_code, cur_name);
            if(!currency) {
                throw new Error(`No se encontro la moneda con el nombre: ${cur_name}`);
            }
            return currency;
        } catch (error: any) {
            console.error('Error en findCurrencyByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}