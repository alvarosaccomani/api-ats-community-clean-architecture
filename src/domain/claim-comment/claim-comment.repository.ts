import { ClaimCommentEntity } from "./claim-comment.entity";

export interface ClaimCommentRepository {
    getComments(cmp_uuid: string, cla_uuid: string): Promise<ClaimCommentEntity[] | null>;
    createComment(comment: ClaimCommentEntity): Promise<ClaimCommentEntity | null>;
}
