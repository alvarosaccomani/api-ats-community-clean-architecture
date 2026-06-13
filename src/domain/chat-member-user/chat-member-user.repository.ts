import { ChatMemberUserEntity, ChatMemberUserUpdateData } from "./chat-member-user.entity";

export interface ChatMemberUserRepository {
    getChatMemberUsers(cmp_uuid: string, chr_uuid: string): Promise<ChatMemberUserEntity[] | null>;
    findChatMemberUserById(cmp_uuid: string, chr_uuid: string, usr_Uuid: string): Promise<ChatMemberUserEntity | null>;
    createChatMemberUser(ChatMemberUser: ChatMemberUserEntity): Promise<ChatMemberUserEntity | null>;
    updateChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string, ChatMemberUser: ChatMemberUserUpdateData): Promise<ChatMemberUserEntity | null>;
    deleteChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string): Promise<ChatMemberUserEntity | null>;
}