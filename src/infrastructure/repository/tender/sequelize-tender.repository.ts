import { TenderEntity, TenderUpdateData } from "../../../domain/tender/tender.entity";
import { TenderRepository } from "../../../domain/tender/tender.repository";
import { SequelizeTender } from "../../model/tender/tender.model";

export class SequelizeRepository implements TenderRepository {
    async getTenders(cmp_uuid: string, cla_uuid: string): Promise<TenderEntity[] | null> {
        try {
            const tenders = await SequelizeTender.findAll({
                where: {
                    cmp_uuid: cmp_uuid,
                    cla_uuid: cla_uuid
                }
            });
            return tenders;
        } catch (error: any) {
            console.error('Error en getTenders:', error.message);
            throw error;
        }
    }

    async findTenderById(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderEntity | null> {
        try {
            const tender = await SequelizeTender.findOne({
                where: {
                    cmp_uuid: cmp_uuid,
                    cla_uuid: cla_uuid,
                    ten_uuid: ten_uuid
                }
            });
            return tender ? (tender.dataValues as TenderEntity) : null;
        } catch (error: any) {
            console.error('Error en findTenderById:', error.message);
            throw error;
        }
    }

    async createTender(tender: TenderEntity): Promise<TenderEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, ten_votingdeadline, ten_status, ten_createdat, ten_updatedat } = tender;
            const result = await SequelizeTender.create({
                cmp_uuid,
                cla_uuid,
                ten_uuid,
                ten_votingdeadline,
                ten_status,
                ten_createdat,
                ten_updatedat
            });
            if (!result) {
                throw new Error('No se pudo registrar la licitación.');
            }
            return result.dataValues as TenderEntity;
        } catch (error: any) {
            console.error('Error en createTender:', error.message);
            throw error;
        }
    }

    async updateTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tender: TenderUpdateData): Promise<TenderEntity | null> {
        try {
            const [updatedCount, [updatedTender]] = await SequelizeTender.update(
                {
                    ten_votingdeadline: tender.ten_votingdeadline,
                    ten_status: tender.ten_status
                },
                {
                    where: {
                        cmp_uuid,
                        cla_uuid,
                        ten_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la licitación.');
            }
            return updatedTender.get({ plain: true }) as TenderEntity;
        } catch (error: any) {
            console.error('Error en updateTender:', error.message);
            throw error;
        }
    }

    async deleteTender(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderEntity | null> {
        try {
            const tender = await this.findTenderById(cmp_uuid, cla_uuid, ten_uuid);
            if (!tender) {
                throw new Error(`No existe la licitación con ID: ${ten_uuid}`);
            }
            const result = await SequelizeTender.destroy({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    ten_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la licitación.');
            }
            return tender;
        } catch (error: any) {
            console.error('Error en deleteTender:', error.message);
            throw error;
        }
    }
}
