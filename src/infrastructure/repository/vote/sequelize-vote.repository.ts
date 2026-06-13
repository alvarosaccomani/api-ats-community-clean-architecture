import { VoteEntity, VoteUpdateData } from "../../../domain/vote/vote.entity";
import { VoteRepository } from "../../../domain/vote/vote.repository";
import { SequelizeVote } from "../../model/vote/vote.model";

export class SequelizeRepository implements VoteRepository {
    async getVotes(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<VoteEntity[] | null> {
        try {
            const votes = await SequelizeVote.findAll({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    ten_uuid
                }
            });
            return votes;
        } catch (error: any) {
            console.error('Error en getVotes:', error.message);
            throw error;
        }
    }

    async findVoteById(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string): Promise<VoteEntity | null> {
        try {
            const vote = await SequelizeVote.findOne({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    ten_uuid,
                    usr_uuid,
                    vto_uuid
                }
            });
            return vote ? (vote.dataValues as VoteEntity) : null;
        } catch (error: any) {
            console.error('Error en findVoteById:', error.message);
            throw error;
        }
    }

    async createVote(vote: VoteEntity): Promise<VoteEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid, tenopt_uuid, vto_createdat } = vote;
            const result = await SequelizeVote.create({
                cmp_uuid,
                cla_uuid,
                ten_uuid,
                usr_uuid,
                vto_uuid,
                tenopt_uuid,
                vto_createdat
            });
            if (!result) {
                throw new Error('No se pudo registrar el voto.');
            }
            return result.dataValues as VoteEntity;
        } catch (error: any) {
            console.error('Error en createVote:', error.message);
            throw error;
        }
    }

    async updateVote(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string, vote: VoteUpdateData): Promise<VoteEntity | null> {
        try {
            const [updatedCount, [updatedVote]] = await SequelizeVote.update(
                {
                    tenopt_uuid: vote.tenopt_uuid
                },
                {
                    where: {
                        cmp_uuid,
                        cla_uuid,
                        ten_uuid,
                        usr_uuid,
                        vto_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar el voto.');
            }
            return updatedVote.get({ plain: true }) as VoteEntity;
        } catch (error: any) {
            console.error('Error en updateVote:', error.message);
            throw error;
        }
    }

    async deleteVote(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string): Promise<VoteEntity | null> {
        try {
            const vote = await this.findVoteById(cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid);
            if (!vote) {
                throw new Error(`No existe el voto con ID: ${vto_uuid}`);
            }
            const result = await SequelizeVote.destroy({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    ten_uuid,
                    usr_uuid,
                    vto_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar el voto.');
            }
            return vote;
        } catch (error: any) {
            console.error('Error en deleteVote:', error.message);
            throw error;
        }
    }
}
