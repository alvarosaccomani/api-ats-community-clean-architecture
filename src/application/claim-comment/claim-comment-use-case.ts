import { ClaimCommentRepository } from "../../domain/claim-comment/claim-comment.repository";
import { ClaimCommentValue } from "../../domain/claim-comment/claim-comment.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ClaimCommentUseCase {
    constructor(
        private readonly claimCommentRepository: ClaimCommentRepository
    ) {
        this.getComments = this.getComments.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    public async getComments(cmp_uuid: string, cla_uuid: string) {
        try {
            const comments = await this.claimCommentRepository.getComments(cmp_uuid, cla_uuid);
            if (!comments) {
                throw new Error('No hay comentarios.');
            }
            return comments.map(c => ({
                cmp_uuid: c.cmp_uuid,
                cla_uuid: c.cla_uuid,
                clac_uuid: c.clac_uuid,
                usr_uuid: c.usr_uuid,
                clac_text: c.clac_text,
                clac_createdat: TimezoneConverter.toIsoStringInTimezone(c.clac_createdat, 'America/Buenos_Aires'),
                usr: c.usr ? {
                    usr_uuid: c.usr.usr_uuid,
                    usr_name: c.usr.usr_name,
                    usr_surname: c.usr.usr_surname,
                    usr_email: c.usr.usr_email
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getComments (use case):', error.message);
            throw error;
        }
    }

    public async createComment({ cmp_uuid, cla_uuid, usr_uuid, clac_text } : { cmp_uuid: string, cla_uuid: string, usr_uuid: string, clac_text: string }) {
        try {
            const commentValue = new ClaimCommentValue({ cmp_uuid, cla_uuid, usr_uuid, clac_text });
            const created = await this.claimCommentRepository.createComment(commentValue);
            if (!created) {
                throw new Error('No se pudo insertar el comentario.');
            }
            return {
                cmp_uuid: created.cmp_uuid,
                cla_uuid: created.cla_uuid,
                clac_uuid: created.clac_uuid,
                usr_uuid: created.usr_uuid,
                clac_text: created.clac_text,
                clac_createdat: TimezoneConverter.toIsoStringInTimezone(created.clac_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createComment (use case):', error.message);
            throw error;
        }
    }
}
