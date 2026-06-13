export interface ChatMessageEntity {
    cmp_uuid: string;
    chr_uuid: string;
    chrmsg_uuid: string;
    usr_uuid: string;
    chrmsg_text: string;
    chrmsg_isread: boolean;
    chrmsg_createdat: Date
}

//Update
export type ChatMessageUpdateData = Pick<ChatMessageEntity, 'chrmsg_text' | 'chrmsg_isread'>;