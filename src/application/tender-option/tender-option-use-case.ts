import { TenderOptionRepository } from "../../domain/tender-option/tender-option.repository";
import { TenderOptionValue } from "../../domain/tender-option/tender-option.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TenderOptionUseCase {
    constructor(
        private readonly tenderOptionRepository: TenderOptionRepository,
    ) {
        this.getTenderOptions = this.getTenderOptions.bind(this);
        this.getDetailTenderOption = this.getDetailTenderOption.bind(this);
        this.createTenderOption = this.createTenderOption.bind(this);
        this.updateTenderOption = this.updateTenderOption.bind(this);
        this.deleteTenderOption = this.deleteTenderOption.bind(this);
    }

    public async getTenderOptions(cmp_uuid: string, cla_uuid: string, ten_uuid: string) {
        try {
            const options = await this.tenderOptionRepository.getTenderOptions(cmp_uuid, cla_uuid, ten_uuid);
            if (!options) {
                throw new Error('No hay opciones de licitación.');
            }
            return options.map(option => ({
                cmp_uuid: option.cmp_uuid,
                cla_uuid: option.cla_uuid,
                ten_uuid: option.ten_uuid,
                tenopt_uuid: option.tenopt_uuid,
                tenopt_providername: option.tenopt_providername,
                tenopt_amount: Number(option.tenopt_amount),
                tenopt_details: option.tenopt_details,
                tenopt_createdat: TimezoneConverter.toIsoStringInTimezone(option.tenopt_createdat, 'America/Buenos_Aires'),
                tenopt_updatedat: TimezoneConverter.toIsoStringInTimezone(option.tenopt_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getTenderOptions (use case):', error.message);
            throw error;
        }
    }

    public async getDetailTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string) {
        try {
            const option = await this.tenderOptionRepository.findTenderOptionById(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid);
            if (!option) {
                throw new Error(`No hay opción de licitación con ID: ${tenopt_uuid}`);
            }
            return {
                cmp_uuid: option.cmp_uuid,
                cla_uuid: option.cla_uuid,
                ten_uuid: option.ten_uuid,
                tenopt_uuid: option.tenopt_uuid,
                tenopt_providername: option.tenopt_providername,
                tenopt_amount: Number(option.tenopt_amount),
                tenopt_details: option.tenopt_details,
                tenopt_createdat: TimezoneConverter.toIsoStringInTimezone(option.tenopt_createdat, 'America/Buenos_Aires'),
                tenopt_updatedat: TimezoneConverter.toIsoStringInTimezone(option.tenopt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailTenderOption (use case):', error.message);
            throw error;
        }
    }

    public async createTenderOption({ cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid, tenopt_providername, tenopt_amount, tenopt_details }: { cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string, tenopt_providername: string, tenopt_amount: number, tenopt_details: string }) {
        try {
            const optionValue = new TenderOptionValue({ cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid, tenopt_providername, tenopt_amount, tenopt_details });
            const optionCreated = await this.tenderOptionRepository.createTenderOption(optionValue);
            if (!optionCreated) {
                throw new Error('No se pudo registrar la opción de licitación.');
            }
            return {
                cmp_uuid: optionCreated.cmp_uuid,
                cla_uuid: optionCreated.cla_uuid,
                ten_uuid: optionCreated.ten_uuid,
                tenopt_uuid: optionCreated.tenopt_uuid,
                tenopt_providername: optionCreated.tenopt_providername,
                tenopt_amount: Number(optionCreated.tenopt_amount),
                tenopt_details: optionCreated.tenopt_details,
                tenopt_createdat: TimezoneConverter.toIsoStringInTimezone(optionCreated.tenopt_createdat, 'America/Buenos_Aires'),
                tenopt_updatedat: TimezoneConverter.toIsoStringInTimezone(optionCreated.tenopt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createTenderOption (use case):', error.message);
            throw error;
        }
    }

    public async updateTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string, { tenopt_providername, tenopt_amount, tenopt_details }: { tenopt_providername: string, tenopt_amount: number, tenopt_details: string }) {
        try {
            const optionUpdated = await this.tenderOptionRepository.updateTenderOption(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid, { tenopt_providername, tenopt_amount, tenopt_details });
            if (!optionUpdated) {
                throw new Error('No se pudo actualizar la opción de licitación.');
            }
            return {
                cmp_uuid: optionUpdated.cmp_uuid,
                cla_uuid: optionUpdated.cla_uuid,
                ten_uuid: optionUpdated.ten_uuid,
                tenopt_uuid: optionUpdated.tenopt_uuid,
                tenopt_providername: optionUpdated.tenopt_providername,
                tenopt_amount: Number(optionUpdated.tenopt_amount),
                tenopt_details: optionUpdated.tenopt_details,
                tenopt_createdat: TimezoneConverter.toIsoStringInTimezone(optionUpdated.tenopt_createdat, 'America/Buenos_Aires'),
                tenopt_updatedat: TimezoneConverter.toIsoStringInTimezone(optionUpdated.tenopt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateTenderOption (use case):', error.message);
            throw error;
        }
    }

    public async deleteTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string) {
        try {
            const optionDeleted = await this.tenderOptionRepository.deleteTenderOption(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid);
            if (!optionDeleted) {
                throw new Error('No se pudo eliminar la opción de licitación.');
            }
            return {
                cmp_uuid: optionDeleted.cmp_uuid,
                cla_uuid: optionDeleted.cla_uuid,
                ten_uuid: optionDeleted.ten_uuid,
                tenopt_uuid: optionDeleted.tenopt_uuid,
                tenopt_providername: optionDeleted.tenopt_providername,
                tenopt_amount: Number(optionDeleted.tenopt_amount),
                tenopt_details: optionDeleted.tenopt_details,
                tenopt_createdat: TimezoneConverter.toIsoStringInTimezone(optionDeleted.tenopt_createdat, 'America/Buenos_Aires'),
                tenopt_updatedat: TimezoneConverter.toIsoStringInTimezone(optionDeleted.tenopt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteTenderOption (use case):', error.message);
            throw error;
        }
    }
}
