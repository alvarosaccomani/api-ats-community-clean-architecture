import { TenderOptionEntity, TenderOptionUpdateData } from "../../../domain/tender-option/tender-option.entity";
import { TenderOptionRepository } from "../../../domain/tender-option/tender-option.repository";
import { SequelizeTenderOption } from "../../model/tender-option/tender-option.model";

export class SequelizeRepository implements TenderOptionRepository {
    async getTenderOptions(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<TenderOptionEntity[] | null> {
        try {
            const options = await SequelizeTenderOption.findAll({
                where: {
                    cmp_uuid: cmp_uuid,
                    cla_uuid: cla_uuid,
                    ten_uuid: ten_uuid
                }
            });
            return options;
        } catch (error: any) {
            console.error('Error en getTenderOptions:', error.message);
            throw error;
        }
    }

    async findTenderOptionById(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string): Promise<TenderOptionEntity | null> {
        try {
            const option = await SequelizeTenderOption.findOne({
                where: {
                    cmp_uuid: cmp_uuid,
                    cla_uuid: cla_uuid,
                    ten_uuid: ten_uuid,
                    tenopt_uuid: tenopt_uuid
                }
            });
            return option ? (option.dataValues as TenderOptionEntity) : null;
        } catch (error: any) {
            console.error('Error en findTenderOptionById:', error.message);
            throw error;
        }
    }

    async createTenderOption(tenderOption: TenderOptionEntity): Promise<TenderOptionEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid, tenopt_providername, tenopt_amount, tenopt_details, tenopt_createdat, tenopt_updatedat } = tenderOption;
            const result = await SequelizeTenderOption.create({
                cmp_uuid,
                cla_uuid,
                ten_uuid,
                tenopt_uuid,
                tenopt_providername,
                tenopt_amount,
                tenopt_details,
                tenopt_createdat,
                tenopt_updatedat
            });
            if (!result) {
                throw new Error('No se pudo registrar la opción de licitación.');
            }
            return result.dataValues as TenderOptionEntity;
        } catch (error: any) {
            console.error('Error en createTenderOption:', error.message);
            throw error;
        }
    }

    async updateTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string, tenderOption: TenderOptionUpdateData): Promise<TenderOptionEntity | null> {
        try {
            const [updatedCount, [updatedOption]] = await SequelizeTenderOption.update(
                {
                    tenopt_providername: tenderOption.tenopt_providername,
                    tenopt_amount: tenderOption.tenopt_amount,
                    tenopt_details: tenderOption.tenopt_details
                },
                {
                    where: {
                        cmp_uuid,
                        cla_uuid,
                        ten_uuid,
                        tenopt_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la opción de licitación.');
            }
            return updatedOption.get({ plain: true }) as TenderOptionEntity;
        } catch (error: any) {
            console.error('Error en updateTenderOption:', error.message);
            throw error;
        }
    }

    async deleteTenderOption(cmp_uuid: string, cla_uuid: string, ten_uuid: string, tenopt_uuid: string): Promise<TenderOptionEntity | null> {
        try {
            const option = await this.findTenderOptionById(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid);
            if (!option) {
                throw new Error(`No existe la opción de licitación con ID: ${tenopt_uuid}`);
            }
            const result = await SequelizeTenderOption.destroy({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    ten_uuid,
                    tenopt_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la opción de licitación.');
            }
            return option;
        } catch (error: any) {
            console.error('Error en deleteTenderOption:', error.message);
            throw error;
        }
    }
}
