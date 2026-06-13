import { TenderRepository } from "../../domain/tender/tender.repository";
import { TenderValue } from "../../domain/tender/tender.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TenderUseCase {
    constructor(
        private readonly tenderRepository: TenderRepository,
    ) {
        this.getTenders = this.getTenders.bind(this);
        this.getDetailTender = this.getDetailTender.bind(this);
        this.createTender = this.createTender.bind(this);
        this.updateTender = this.updateTender.bind(this);
        this.deleteTender = this.deleteTender.bind(this);
    }

    public async getTenders(cmp_uuid: string, cla_uuid: string) {
        try {
            const tenders = await this.tenderRepository.getTenders(cmp_uuid, cla_uuid);
            if (!tenders) {
                throw new Error('No hay licitaciones.');
            }
            return tenders.map(tender => ({
                cmp_uuid: tender.cmp_uuid,
                cla_uuid: tender.cla_uuid,
                ten_uuid: tender.ten_uuid,
                ten_votingdeadline: TimezoneConverter.toIsoStringInTimezone(tender.ten_votingdeadline, 'America/Buenos_Aires'),
                ten_status: tender.ten_status,
                ten_createdat: TimezoneConverter.toIsoStringInTimezone(tender.ten_createdat, 'America/Buenos_Aires'),
                ten_updatedat: TimezoneConverter.toIsoStringInTimezone(tender.ten_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getTenders (use case):', error.message);
            throw error;
        }
    }

    public async getDetailTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string) {
        try {
            const tender = await this.tenderRepository.findTenderById(cmp_uuid, cla_uuid, ten_uuid);
            if (!tender) {
                throw new Error(`No hay licitación con ID: ${ten_uuid}`);
            }
            return {
                cmp_uuid: tender.cmp_uuid,
                cla_uuid: tender.cla_uuid,
                ten_uuid: tender.ten_uuid,
                ten_votingdeadline: TimezoneConverter.toIsoStringInTimezone(tender.ten_votingdeadline, 'America/Buenos_Aires'),
                ten_status: tender.ten_status,
                ten_createdat: TimezoneConverter.toIsoStringInTimezone(tender.ten_createdat, 'America/Buenos_Aires'),
                ten_updatedat: TimezoneConverter.toIsoStringInTimezone(tender.ten_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailTender (use case):', error.message);
            throw error;
        }
    }

    public async createTender({ cmp_uuid, cla_uuid, ten_uuid, ten_votingdeadline, ten_status }: { cmp_uuid: string, cla_uuid: string, ten_uuid: string, ten_votingdeadline: Date, ten_status: 'Activa' | 'Cerrada' | 'Desierta' }) {
        try {
            const tenderValue = new TenderValue({ cmp_uuid, cla_uuid, ten_uuid, ten_votingdeadline, ten_status });
            const tenderCreated = await this.tenderRepository.createTender(tenderValue);
            if (!tenderCreated) {
                throw new Error('No se pudo insertar la licitación.');
            }
            return {
                cmp_uuid: tenderCreated.cmp_uuid,
                cla_uuid: tenderCreated.cla_uuid,
                ten_uuid: tenderCreated.ten_uuid,
                ten_votingdeadline: TimezoneConverter.toIsoStringInTimezone(tenderCreated.ten_votingdeadline, 'America/Buenos_Aires'),
                ten_status: tenderCreated.ten_status,
                ten_createdat: TimezoneConverter.toIsoStringInTimezone(tenderCreated.ten_createdat, 'America/Buenos_Aires'),
                ten_updatedat: TimezoneConverter.toIsoStringInTimezone(tenderCreated.ten_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createTender (use case):', error.message);
            throw error;
        }
    }

    public async updateTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string, { ten_votingdeadline, ten_status }: { ten_votingdeadline: Date, ten_status: 'Activa' | 'Cerrada' | 'Desierta' }) {
        try {
            const tenderUpdated = await this.tenderRepository.updateTender(cmp_uuid, cla_uuid, ten_uuid, { ten_votingdeadline, ten_status });
            if (!tenderUpdated) {
                throw new Error('No se pudo actualizar la licitación.');
            }
            return {
                cmp_uuid: tenderUpdated.cmp_uuid,
                cla_uuid: tenderUpdated.cla_uuid,
                ten_uuid: tenderUpdated.ten_uuid,
                ten_votingdeadline: TimezoneConverter.toIsoStringInTimezone(tenderUpdated.ten_votingdeadline, 'America/Buenos_Aires'),
                ten_status: tenderUpdated.ten_status,
                ten_createdat: TimezoneConverter.toIsoStringInTimezone(tenderUpdated.ten_createdat, 'America/Buenos_Aires'),
                ten_updatedat: TimezoneConverter.toIsoStringInTimezone(tenderUpdated.ten_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateTender (use case):', error.message);
            throw error;
        }
    }

    public async deleteTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string) {
        try {
            const tenderDeleted = await this.tenderRepository.deleteTender(cmp_uuid, cla_uuid, ten_uuid);
            if (!tenderDeleted) {
                throw new Error('No se pudo eliminar la licitación.');
            }
            return {
                cmp_uuid: tenderDeleted.cmp_uuid,
                cla_uuid: tenderDeleted.cla_uuid,
                ten_uuid: tenderDeleted.ten_uuid,
                ten_votingdeadline: TimezoneConverter.toIsoStringInTimezone(tenderDeleted.ten_votingdeadline, 'America/Buenos_Aires'),
                ten_status: tenderDeleted.ten_status,
                ten_createdat: TimezoneConverter.toIsoStringInTimezone(tenderDeleted.ten_createdat, 'America/Buenos_Aires'),
                ten_updatedat: TimezoneConverter.toIsoStringInTimezone(tenderDeleted.ten_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteTender (use case):', error.message);
            throw error;
        }
    }
}
