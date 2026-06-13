import { ChatRoomRepository } from "../../domain/chat-room/chat-room.repository";
import { ChatRoomValue } from "../../domain/chat-room/chat-room.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ChatRoomUseCase {
    constructor(
        private readonly chatRoomRepository: ChatRoomRepository,
    ) {
        this.getChatRooms = this.getChatRooms.bind(this);
        this.getDetailChatRoom = this.getDetailChatRoom.bind(this);
        this.createChatRoom = this.createChatRoom.bind(this);
        this.updateChatRoom = this.updateChatRoom.bind(this);
        this.deleteChatRoom = this.deleteChatRoom.bind(this);
    }

    public async getChatRooms(cmp_uuid: string) {
        try {
            const rooms = await this.chatRoomRepository.getChatRooms(cmp_uuid);
            if (!rooms) {
                throw new Error('No hay salas de chat.');
            }
            return rooms.map(room => ({
                cmp_uuid: room.cmp_uuid,
                chr_uuid: room.chr_uuid,
                chr_name: room.chr_name,
                chr_type: room.chr_type,
                cla_uuid: room.cla_uuid,
                ten_uuid: room.ten_uuid,
                chr_createdat: TimezoneConverter.toIsoStringInTimezone(room.chr_createdat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getChatRooms (use case):', error.message);
            throw error;
        }
    }

    public async getDetailChatRoom(cmp_uuid: string, chr_uuid: string) {
        try {
            const room = await this.chatRoomRepository.findChatRoomById(cmp_uuid, chr_uuid);
            if (!room) {
                throw new Error(`No hay sala de chat con ID: ${chr_uuid}`);
            }
            return {
                cmp_uuid: room.cmp_uuid,
                chr_uuid: room.chr_uuid,
                chr_name: room.chr_name,
                chr_type: room.chr_type,
                cla_uuid: room.cla_uuid,
                ten_uuid: room.ten_uuid,
                chr_createdat: TimezoneConverter.toIsoStringInTimezone(room.chr_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailChatRoom (use case):', error.message);
            throw error;
        }
    }

    public async createChatRoom(body: any) {
        try {
            const roomValue = new ChatRoomValue(body);
            const roomCreated = await this.chatRoomRepository.createChatRoom(roomValue);
            if (!roomCreated) {
                throw new Error('No se pudo crear la sala de chat.');
            }
            return {
                cmp_uuid: roomCreated.cmp_uuid,
                chr_uuid: roomCreated.chr_uuid,
                chr_name: roomCreated.chr_name,
                chr_type: roomCreated.chr_type,
                cla_uuid: roomCreated.cla_uuid,
                ten_uuid: roomCreated.ten_uuid,
                chr_createdat: TimezoneConverter.toIsoStringInTimezone(roomCreated.chr_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createChatRoom (use case):', error.message);
            throw error;
        }
    }

    public async updateChatRoom(cmp_uuid: string, chr_uuid: string, body: any) {
        try {
            const roomUpdated = await this.chatRoomRepository.updateChatRoom(cmp_uuid, chr_uuid, body);
            if (!roomUpdated) {
                throw new Error('No se pudo actualizar la sala de chat.');
            }
            return {
                cmp_uuid: roomUpdated.cmp_uuid,
                chr_uuid: roomUpdated.chr_uuid,
                chr_name: roomUpdated.chr_name,
                chr_type: roomUpdated.chr_type,
                cla_uuid: roomUpdated.cla_uuid,
                ten_uuid: roomUpdated.ten_uuid,
                chr_createdat: TimezoneConverter.toIsoStringInTimezone(roomUpdated.chr_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateChatRoom (use case):', error.message);
            throw error;
        }
    }

    public async deleteChatRoom(cmp_uuid: string, chr_uuid: string) {
        try {
            const roomDeleted = await this.chatRoomRepository.deleteChatRoom(cmp_uuid, chr_uuid);
            if (!roomDeleted) {
                throw new Error('No se pudo eliminar la sala de chat.');
            }
            return {
                cmp_uuid: roomDeleted.cmp_uuid,
                chr_uuid: roomDeleted.chr_uuid,
                chr_name: roomDeleted.chr_name,
                chr_type: roomDeleted.chr_type,
                cla_uuid: roomDeleted.cla_uuid,
                ten_uuid: roomDeleted.ten_uuid,
                chr_createdat: TimezoneConverter.toIsoStringInTimezone(roomDeleted.chr_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteChatRoom (use case):', error.message);
            throw error;
        }
    }
}
