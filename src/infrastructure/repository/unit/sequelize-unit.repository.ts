import { UnitEntity, UnitUpdateData } from "../../../domain/unit/unit.entity";
import { UnitRepository } from "../../../domain/unit/unit.repository";
import { SequelizeUnit } from "../../model/unit/unit.model";

export class SequelizeRepository implements UnitRepository {
    async getUnits(cmp_uuid: string): Promise<UnitEntity[] | null> {
        try {
            const units = await SequelizeUnit.findAll({
                where: {
                    cmp_uuid
                }
            });
            return units;
        } catch (error: any) {
            console.error('Error en getUnits:', error.message);
            throw error;
        }
    }

    async findUnitById(cmp_uuid: string, uni_uuid: string): Promise<UnitEntity | null> {
        try {
            const unit = await SequelizeUnit.findOne({
                where: {
                    cmp_uuid,
                    uni_uuid
                }
            });
            return unit ? (unit.dataValues as UnitEntity) : null;
        } catch (error: any) {
            console.error('Error en findUnitById:', error.message);
            throw error;
        }
    }

    async createUnit(unit: UnitEntity): Promise<UnitEntity | null> {
        try {
            const { cmp_uuid, uni_uuid, uni_code, uni_category, uni_status, uni_financialcoefficient, uni_baseamountcustom, uni_locationdetails, uni_metadata, uni_istransferable, uni_createdat, uni_updatedat } = unit;
            const result = await SequelizeUnit.create({
                cmp_uuid,
                uni_uuid,
                uni_code,
                uni_category,
                uni_status,
                uni_financialcoefficient,
                uni_baseamountcustom,
                uni_locationdetails,
                uni_metadata,
                uni_istransferable,
                uni_createdat,
                uni_updatedat
            });
            if (!result) {
                throw new Error('No se pudo registrar la unidad.');
            }
            return result.dataValues as UnitEntity;
        } catch (error: any) {
            console.error('Error en createUnit:', error.message);
            throw error;
        }
    }

    async updateUnit(cmp_uuid: string, uni_uuid: string, unit: UnitUpdateData): Promise<UnitEntity | null> {
        try {
            const [updatedCount, [updatedUnit]] = await SequelizeUnit.update(
                {
                    uni_code: unit.uni_code,
                    uni_category: unit.uni_category,
                    uni_status: unit.uni_status,
                    uni_financialcoefficient: unit.uni_financialcoefficient,
                    uni_baseamountcustom: unit.uni_baseamountcustom,
                    uni_locationdetails: unit.uni_locationdetails,
                    uni_metadata: unit.uni_metadata,
                    uni_istransferable: unit.uni_istransferable
                },
                {
                    where: {
                        cmp_uuid,
                        uni_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la unidad.');
            }
            return updatedUnit.get({ plain: true }) as UnitEntity;
        } catch (error: any) {
            console.error('Error en updateUnit:', error.message);
            throw error;
        }
    }

    async deleteUnit(cmp_uuid: string, uni_uuid: string): Promise<UnitEntity | null> {
        try {
            const unit = await this.findUnitById(cmp_uuid, uni_uuid);
            if (!unit) {
                throw new Error(`No existe la unidad con ID: ${uni_uuid}`);
            }
            const result = await SequelizeUnit.destroy({
                where: {
                    cmp_uuid,
                    uni_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la unidad.');
            }
            return unit;
        } catch (error: any) {
            console.error('Error en deleteUnit:', error.message);
            throw error;
        }
    }

    async findUnitByCode(cmp_uuid: string, uni_code: string): Promise<UnitEntity | null> {
        try {
            const unit = await SequelizeUnit.findOne({
                where: {
                    cmp_uuid,
                    uni_code
                }
            });
            return unit ? (unit.dataValues as UnitEntity) : null;
        } catch (error: any) {
            console.error('Error en findUnitByCode:', error.message);
            throw error;
        }
    }
}
