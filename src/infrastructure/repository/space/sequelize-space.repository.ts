import { SpaceEntity, SpaceUpdateData } from "../../../domain/space/space.entity";
import { SpaceRepository } from "../../../domain/space/space.repository";
import { SequelizeSpace } from "../../model/space/space.model";
import { SequelizeSite } from "../../model/site/site.model";

export class SequelizeSpaceRepository implements SpaceRepository {
    async getSpacesBySite(cmp_uuid: string, sit_uuid: string): Promise<SpaceEntity[] | null> {
        try {
            const spaces = await SequelizeSpace.findAll({
                where: { sit_uuid },
                include: [
                    {
                        model: SequelizeSite,
                        as: 'site',
                        where: { cmp_uuid },
                        attributes: ['sit_uuid', 'sit_name']
                    }
                ],
                order: [['spa_name', 'ASC']]
            });
            return spaces;
        } catch (error: any) {
            console.error('Error en getSpacesBySite:', error.message);
            throw error;
        }
    }

    async getSpaces(cmp_uuid: string): Promise<SpaceEntity[] | null> {
        try {
            const spaces = await SequelizeSpace.findAll({
                include: [
                    {
                        model: SequelizeSite,
                        as: 'site',
                        where: { cmp_uuid },
                        attributes: ['sit_uuid', 'sit_name']
                    }
                ],
                order: [['spa_name', 'ASC']]
            });
            return spaces;
        } catch (error: any) {
            console.error('Error en getSpaces:', error.message);
            throw error;
        }
    }

    async findSpaceById(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<SpaceEntity | null> {
        try {
            const space = await SequelizeSpace.findOne({
                where: { cmp_uuid, sit_uuid, spa_uuid },
                include: [
                    {
                        model: SequelizeSite,
                        as: 'site',
                        attributes: ['sit_uuid', 'sit_name']
                    }
                ]
            });
            return space ? (space.dataValues as SpaceEntity) : null;
        } catch (error: any) {
            console.error('Error en findSpaceById:', error.message);
            throw error;
        }
    }

    async createSpace(space: SpaceEntity): Promise<SpaceEntity | null> {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status } = space;
            const result = await SequelizeSpace.create({
                cmp_uuid,
                sit_uuid,
                spa_uuid,
                spa_code,
                spa_name,
                spa_type,
                spa_capacity,
                spa_cost,
                spa_status
            });
            return result ? (result.dataValues as SpaceEntity) : null;
        } catch (error: any) {
            console.error('Error en createSpace:', error.message);
            throw error;
        }
    }

    async updateSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string, space: SpaceUpdateData): Promise<SpaceEntity | null> {
        try {
            const [updatedCount, [updatedSpace]] = await SequelizeSpace.update(
                {
                    spa_code: space.spa_code,
                    spa_name: space.spa_name,
                    spa_type: space.spa_type,
                    spa_capacity: space.spa_capacity,
                    spa_cost: space.spa_cost,
                    spa_status: space.spa_status
                },
                {
                    where: { cmp_uuid, sit_uuid, spa_uuid },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar el espacio.');
            }
            return updatedSpace.get({ plain: true }) as SpaceEntity;
        } catch (error: any) {
            console.error('Error en updateSpace:', error.message);
            throw error;
        }
    }

    async deleteSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<SpaceEntity | null> {
        try {
            const space = await this.findSpaceById(cmp_uuid, sit_uuid, spa_uuid);
            if (!space) {
                throw new Error(`No existe el espacio con ID: ${spa_uuid}`);
            }
            const result = await SequelizeSpace.destroy({
                where: { cmp_uuid, sit_uuid, spa_uuid }
            });
            if (!result) {
                throw new Error('No se pudo eliminar el espacio.');
            }
            return space;
        } catch (error: any) {
            console.error('Error en deleteSpace:', error.message);
            throw error;
        }
    }
}
