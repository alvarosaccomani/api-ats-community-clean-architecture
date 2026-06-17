import { ClaimEntity, ClaimUpdateData } from "../../../domain/claim/claim.entity";
import { ClaimRepository } from "../../../domain/claim/claim.repository";
import { SequelizeClaim } from "../../model/claim/claim.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeUnit } from "../../model/unit/unit.model";
import { SequelizeSite } from "../../model/site/site.model";
import { SequelizeSpace } from "../../model/space/space.model";

export class SequelizeRepository implements ClaimRepository {
    async getClaims(cmp_uuid: string, cla_uuid: string, filters?: any): Promise<ClaimEntity[] | null> {
        try {
            const whereClause: any = { cmp_uuid };
            if (cla_uuid && cla_uuid !== 'null' && cla_uuid !== 'undefined' && cla_uuid !== '') {
                whereClause.cla_uuid = cla_uuid;
            }
            if (filters) {
                if (filters.usr_uuid) whereClause.usr_uuid = filters.usr_uuid;
                if (filters.uni_uuid) whereClause.uni_uuid = filters.uni_uuid;
                if (filters.sit_uuid) whereClause.sit_uuid = filters.sit_uuid;
                if (filters.spa_uuid) whereClause.spa_uuid = filters.spa_uuid;
                if (filters.cla_status) whereClause.cla_status = filters.cla_status;
                if (filters.cla_type) whereClause.cla_type = filters.cla_type;
                if (filters.cla_priority) whereClause.cla_priority = filters.cla_priority;
            }
            const claims = await SequelizeClaim.findAll({
                where: whereClause,
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    },
                    {
                        model: SequelizeUnit,
                        as: 'unit',
                        attributes: ['uni_uuid', 'uni_code', 'uni_category']
                    },
                    {
                        model: SequelizeSite,
                        as: 'site',
                        attributes: ['sit_uuid', 'sit_name']
                    },
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type']
                    }
                ],
                order: [['cla_createdat', 'DESC']]
            });
            return claims;
        } catch (error: any) {
            console.error('Error en getClaims:', error.message);
            throw error;
        }
    }

    async findClaimById(cmp_uuid: string, cla_uuid: string): Promise<ClaimEntity | null> {
        try {
            const claim = await SequelizeClaim.findOne({
                where: {
                    cmp_uuid,
                    cla_uuid
                },
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    },
                    {
                        model: SequelizeUnit,
                        as: 'unit',
                        attributes: ['uni_uuid', 'uni_code', 'uni_category']
                    },
                    {
                        model: SequelizeSite,
                        as: 'site',
                        attributes: ['sit_uuid', 'sit_name']
                    },
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type']
                    }
                ]
            });
            return claim ? (claim.dataValues as ClaimEntity) : null;
        } catch (error: any) {
            console.error('Error en findClaimById:', error.message);
            throw error;
        }
    }

    async createClaim(claim: ClaimEntity): Promise<ClaimEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, usr_uuid, uni_uuid, sit_uuid, spa_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority, cla_createdat, cla_updatedat } = claim;
            const result = await SequelizeClaim.create({
                cmp_uuid,
                cla_uuid,
                usr_uuid,
                uni_uuid,
                sit_uuid,
                spa_uuid,
                cla_title,
                cla_description,
                cla_type,
                cla_status,
                cla_priority,
                cla_createdat,
                cla_updatedat
            });
            if (!result) {
                throw new Error('No se pudo crear el reclamo.');
            }
            return result.dataValues as ClaimEntity;
        } catch (error: any) {
            console.error('Error en createClaim:', error.message);
            throw error;
        }
    }

    async updateClaim(cmp_uuid: string, cla_uuid: string, claim: ClaimUpdateData): Promise<ClaimEntity | null> {
        try {
            const [updatedCount, [updatedClaim]] = await SequelizeClaim.update(
                {
                    usr_uuid: claim.usr_uuid,
                    uni_uuid: claim.uni_uuid,
                    sit_uuid: claim.sit_uuid,
                    spa_uuid: claim.spa_uuid,
                    cla_title: claim.cla_title,
                    cla_description: claim.cla_description,
                    cla_type: claim.cla_type,
                    cla_status: claim.cla_status,
                    cla_priority: claim.cla_priority
                },
                {
                    where: {
                        cmp_uuid,
                        cla_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar el reclamo.');
            }
            return updatedClaim.get({ plain: true }) as ClaimEntity;
        } catch (error: any) {
            console.error('Error en updateClaim:', error.message);
            throw error;
        }
    }

    async deleteClaim(cmp_uuid: string, cla_uuid: string): Promise<ClaimEntity | null> {
        try {
            const claim = await this.findClaimById(cmp_uuid, cla_uuid);
            if (!claim) {
                throw new Error(`No existe el reclamo con ID: ${cla_uuid}`);
            }
            const result = await SequelizeClaim.destroy({
                where: {
                    cmp_uuid,
                    cla_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar el reclamo.');
            }
            return claim;
        } catch (error: any) {
            console.error('Error en deleteClaim:', error.message);
            throw error;
        }
    }

    async findClaimByTitle(cmp_uuid: string, cla_title: string): Promise<ClaimEntity | null> {
        try {
            const claim = await SequelizeClaim.findOne({
                where: {
                    cmp_uuid,
                    cla_title
                }
            });
            return claim ? (claim.dataValues as ClaimEntity) : null;
        } catch (error: any) {
            console.error('Error en findClaimByTitle:', error.message);
            throw error;
        }
    }
}
