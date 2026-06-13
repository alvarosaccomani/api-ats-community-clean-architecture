import { UnitEntity, UnitUpdateData } from "./unit.entity";

export interface UnitRepository {
    getUnits(cmp_uuid: string): Promise<UnitEntity[] | null>;
    findUnitById(cmp_uuid: string, uni_uuid: string): Promise<UnitEntity | null>;
    createUnit(Unit: UnitEntity): Promise<UnitEntity | null>;
    updateUnit(cmp_uuid: string, uni_uuid: string, Unit: UnitUpdateData): Promise<UnitEntity | null>;
    deleteUnit(cmp_uuid: string, uni_uuid: string): Promise<UnitEntity | null>;
    findUnitByCode(cmp_uuid: string, uni_code: string): Promise<UnitEntity | null>;
}