import { VoteEntity, VoteUpdateData } from "./vote.entity";

export interface VoteRepository {
    getVotes(cmp_uuid: string, cla_uuid: string, ten_uuid: string): Promise<VoteEntity[] | null>;
    findVoteById(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string): Promise<VoteEntity | null>;
    createVote(Vote: VoteEntity): Promise<VoteEntity | null>;
    updateVote(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string, Vote: VoteUpdateData): Promise<VoteEntity | null>;
    deleteVote(cmp_uuid: string, cla_uuid: string, ten_uuid: string, usr_uuid: string, vto_uuid: string): Promise<VoteEntity | null>;
}