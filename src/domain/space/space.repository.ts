import { SpaceEntity, SpaceUpdateData } from "./space.entity";

export interface SpaceRepository {
    getSpacesBySite(cmp_uuid: string, sit_uuid: string): Promise<SpaceEntity[] | null>;
    getSpaces(cmp_uuid: string): Promise<SpaceEntity[] | null>;
    findSpaceById(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<SpaceEntity | null>;
    createSpace(space: SpaceEntity): Promise<SpaceEntity | null>;
    updateSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string, space: SpaceUpdateData): Promise<SpaceEntity | null>;
    deleteSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<SpaceEntity | null>;
}