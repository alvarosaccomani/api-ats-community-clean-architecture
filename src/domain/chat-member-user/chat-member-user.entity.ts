export interface ChatMemberUserEntity {
    cmp_uuid: string;
    chr_uuid: string;
    usr_uuid: string;
    chmu_joinedat: Date
}

//Update
export type ChatMemberUserUpdateData = Pick<ChatMemberUserEntity, 'chmu_joinedat'>;