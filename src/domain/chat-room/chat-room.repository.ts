import { ChatRoomEntity, ChatRoomUpdateData } from "./chat-room.entity";

export interface ChatRoomRepository {
    getChatRooms(cmp_uuid: string): Promise<ChatRoomEntity[] | null>;
    findChatRoomById(cmp_uuid: string, chr_uuid: string): Promise<ChatRoomEntity | null>;
    createChatRoom(ChatRoom: ChatRoomEntity): Promise<ChatRoomEntity | null>;
    updateChatRoom(cmp_uuid: string, chr_uuid: string, ChatRoom: ChatRoomUpdateData): Promise<ChatRoomEntity | null>;
    deleteChatRoom(cmp_uuid: string, chr_uuid: string): Promise<ChatRoomEntity | null>;
}