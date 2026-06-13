import { ChatMessageEntity, ChatMessageUpdateData } from "./chat-message.entity";

export interface ChatMessageRepository {
    getChatMessages(cmp_uuid: string, chr_uuid: string): Promise<ChatMessageEntity[] | null>;
    findChatMessageById(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string): Promise<ChatMessageEntity | null>;
    createChatMessage(ChatMessage: ChatMessageEntity): Promise<ChatMessageEntity | null>;
    updateChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string, ChatMessage: ChatMessageUpdateData): Promise<ChatMessageEntity | null>;
    deleteChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string): Promise<ChatMessageEntity | null>;
}