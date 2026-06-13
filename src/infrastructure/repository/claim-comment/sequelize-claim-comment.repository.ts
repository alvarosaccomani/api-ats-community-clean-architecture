import { ClaimCommentEntity } from "../../../domain/claim-comment/claim-comment.entity";
import { ClaimCommentRepository } from "../../../domain/claim-comment/claim-comment.repository";
import { SequelizeClaimComment } from "../../model/claim-comment/claim-comment.model";
import { SequelizeUser } from "../../model/user/user.model";

export class SequelizeRepository implements ClaimCommentRepository {
    async getComments(cmp_uuid: string, cla_uuid: string): Promise<ClaimCommentEntity[] | null> {
        try {
            const comments = await SequelizeClaimComment.findAll({
                where: {
                    cmp_uuid,
                    cla_uuid
                },
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    }
                ],
                order: [['clac_createdat', 'ASC']]
            });
            return comments;
        } catch (error: any) {
            console.error('Error en getComments (repository):', error.message);
            throw error;
        }
    }

    async createComment(comment: ClaimCommentEntity): Promise<ClaimCommentEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, clac_uuid, usr_uuid, clac_text, clac_createdat } = comment;
            const result = await SequelizeClaimComment.create({
                cmp_uuid,
                cla_uuid,
                clac_uuid,
                usr_uuid,
                clac_text,
                clac_createdat
            });
            if (!result) {
                throw new Error('No se pudo crear el comentario.');
            }
            return result.dataValues as ClaimCommentEntity;
        } catch (error: any) {
            console.error('Error en createComment (repository):', error.message);
            throw error;
        }
    }
}
