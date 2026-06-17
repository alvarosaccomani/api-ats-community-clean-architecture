import { UnitRepository } from "../../domain/unit/unit.repository";
import { UnitValue } from "../../domain/unit/unit.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class UnitUseCase {
    constructor(
        private readonly unitRepository: UnitRepository,
    ) {
        this.getUnits = this.getUnits.bind(this);
        this.getDetailUnit = this.getDetailUnit.bind(this);
        this.createUnit = this.createUnit.bind(this);
        this.updateUnit = this.updateUnit.bind(this);
        this.deleteUnit = this.deleteUnit.bind(this);
        this.findUnitByCode = this.findUnitByCode.bind(this);
    }

    public async getUnits(cmp_uuid: string) {
        try {
            const units = await this.unitRepository.getUnits(cmp_uuid);
            if (!units) {
                throw new Error('No hay unidades.');
            }
            return units.map(unit => ({
                cmp_uuid: unit.cmp_uuid,
                uni_uuid: unit.uni_uuid,
                uni_code: unit.uni_code,
                uni_category: unit.uni_category,
                uni_status: unit.uni_status,
                uni_financialcoefficient: Number(unit.uni_financialcoefficient),
                uni_baseamountcustom: Number(unit.uni_baseamountcustom),
                uni_locationdetails: unit.uni_locationdetails,
                uni_metadata: unit.uni_metadata,
                uni_istransferable: unit.uni_istransferable,
                sit_uuid: unit.sit_uuid,
                spa_uuid: unit.spa_uuid,
                site: (unit as any).site || null,
                space: (unit as any).space || null,
                uni_createdat: TimezoneConverter.toIsoStringInTimezone(unit.uni_createdat, 'America/Buenos_Aires'),
                uni_updatedat: TimezoneConverter.toIsoStringInTimezone(unit.uni_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getUnits (use case):', error.message);
            throw error;
        }
    }

    public async getDetailUnit(cmp_uuid: string, uni_uuid: string) {
        try {
            const unit = await this.unitRepository.findUnitById(cmp_uuid, uni_uuid);
            if (!unit) {
                throw new Error(`No hay unidad con ID: ${uni_uuid}`);
            }
            return {
                cmp_uuid: unit.cmp_uuid,
                uni_uuid: unit.uni_uuid,
                uni_code: unit.uni_code,
                uni_category: unit.uni_category,
                uni_status: unit.uni_status,
                uni_financialcoefficient: Number(unit.uni_financialcoefficient),
                uni_baseamountcustom: Number(unit.uni_baseamountcustom),
                uni_locationdetails: unit.uni_locationdetails,
                uni_metadata: unit.uni_metadata,
                uni_istransferable: unit.uni_istransferable,
                sit_uuid: unit.sit_uuid,
                spa_uuid: unit.spa_uuid,
                site: (unit as any).site || null,
                space: (unit as any).space || null,
                uni_createdat: TimezoneConverter.toIsoStringInTimezone(unit.uni_createdat, 'America/Buenos_Aires'),
                uni_updatedat: TimezoneConverter.toIsoStringInTimezone(unit.uni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailUnit (use case):', error.message);
            throw error;
        }
    }

    public async createUnit(body: any) {
        try {
            const unitValue = new UnitValue(body);
            const unitCreated = await this.unitRepository.createUnit(unitValue);
            if (!unitCreated) {
                throw new Error('No se pudo registrar la unidad.');
            }
            return {
                cmp_uuid: unitCreated.cmp_uuid,
                uni_uuid: unitCreated.uni_uuid,
                uni_code: unitCreated.uni_code,
                uni_category: unitCreated.uni_category,
                uni_status: unitCreated.uni_status,
                uni_financialcoefficient: Number(unitCreated.uni_financialcoefficient),
                uni_baseamountcustom: Number(unitCreated.uni_baseamountcustom),
                uni_locationdetails: unitCreated.uni_locationdetails,
                uni_metadata: unitCreated.uni_metadata,
                uni_istransferable: unitCreated.uni_istransferable,
                sit_uuid: unitCreated.sit_uuid,
                spa_uuid: unitCreated.spa_uuid,
                uni_createdat: TimezoneConverter.toIsoStringInTimezone(unitCreated.uni_createdat, 'America/Buenos_Aires'),
                uni_updatedat: TimezoneConverter.toIsoStringInTimezone(unitCreated.uni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createUnit (use case):', error.message);
            throw error;
        }
    }

    public async updateUnit(cmp_uuid: string, uni_uuid: string, body: any) {
        try {
            const unitUpdated = await this.unitRepository.updateUnit(cmp_uuid, uni_uuid, body);
            if (!unitUpdated) {
                throw new Error('No se pudo actualizar la unidad.');
            }
            return {
                cmp_uuid: unitUpdated.cmp_uuid,
                uni_uuid: unitUpdated.uni_uuid,
                uni_code: unitUpdated.uni_code,
                uni_category: unitUpdated.uni_category,
                uni_status: unitUpdated.uni_status,
                uni_financialcoefficient: Number(unitUpdated.uni_financialcoefficient),
                uni_baseamountcustom: Number(unitUpdated.uni_baseamountcustom),
                uni_locationdetails: unitUpdated.uni_locationdetails,
                uni_metadata: unitUpdated.uni_metadata,
                uni_istransferable: unitUpdated.uni_istransferable,
                sit_uuid: unitUpdated.sit_uuid,
                spa_uuid: unitUpdated.spa_uuid,
                uni_createdat: TimezoneConverter.toIsoStringInTimezone(unitUpdated.uni_createdat, 'America/Buenos_Aires'),
                uni_updatedat: TimezoneConverter.toIsoStringInTimezone(unitUpdated.uni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateUnit (use case):', error.message);
            throw error;
        }
    }

    public async deleteUnit(cmp_uuid: string, uni_uuid: string) {
        try {
            const unitDeleted = await this.unitRepository.deleteUnit(cmp_uuid, uni_uuid);
            if (!unitDeleted) {
                throw new Error('No se pudo eliminar la unidad.');
            }
            return {
                cmp_uuid: unitDeleted.cmp_uuid,
                uni_uuid: unitDeleted.uni_uuid,
                uni_code: unitDeleted.uni_code,
                uni_category: unitDeleted.uni_category,
                uni_status: unitDeleted.uni_status,
                uni_financialcoefficient: Number(unitDeleted.uni_financialcoefficient),
                uni_baseamountcustom: Number(unitDeleted.uni_baseamountcustom),
                uni_locationdetails: unitDeleted.uni_locationdetails,
                uni_metadata: unitDeleted.uni_metadata,
                uni_istransferable: unitDeleted.uni_istransferable,
                sit_uuid: unitDeleted.sit_uuid,
                spa_uuid: unitDeleted.spa_uuid,
                uni_createdat: TimezoneConverter.toIsoStringInTimezone(unitDeleted.uni_createdat, 'America/Buenos_Aires'),
                uni_updatedat: TimezoneConverter.toIsoStringInTimezone(unitDeleted.uni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteUnit (use case):', error.message);
            throw error;
        }
    }

    public async findUnitByCode(cmp_uuid: string, uni_code: string) {
        try {
            const unit = await this.unitRepository.findUnitByCode(cmp_uuid, uni_code);
            if (!unit) {
                throw new Error(`No se encontró la unidad con el código: ${uni_code}`);
            }
            return unit;
        } catch (error: any) {
            console.error('Error en findUnitByCode (use case):', error.message);
            throw error;
        }
    }
}
