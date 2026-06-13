import { ChatRoomEntity, ChatRoomUpdateData } from "../../../domain/chat-room/chat-room.entity";
import { ChatRoomRepository } from "../../../domain/chat-room/chat-room.repository";
import { SequelizeChatRoom } from "../../model/chat-room/chat-room.model";

export class SequelizeRepository implements ChatRoomRepository {
    async getChatRooms(cmp_uuid: string): Promise<ChatRoomEntity[] | null> {
        try {
            const rooms = await SequelizeChatRoom.findAll({
                where: {
                    cmp_uuid
                }
            });
            return rooms;
        } catch (error: any) {
            console.error('Error en getChatRooms:', error.message);
            throw error;
        }
    }

    async findChatRoomById(cmp_uuid: string, chr_uuid: string): Promise<ChatRoomEntity | null> {
        try {
            const room = await SequelizeChatRoom.findOne({
                where: {
                    cmp_uuid,
                    chr_uuid
                }
            });
            return room ? (room.dataValues as ChatRoomEntity) : null;
        } catch (error: any) {
            console.error('Error en findChatRoomById:', error.message);
            throw error;
        }
    }

    async createChatRoom(room: ChatRoomEntity): Promise<ChatRoomEntity | null> {
        try {
            const { cmp_uuid, chr_uuid, chr_name, chr_type, cla_uuid, ten_uuid, chr_createdat } = room;
            const result = await SequelizeChatRoom.create({
                cmp_uuid,
                chr_uuid,
                chr_name,
                chr_type,
                cla_uuid,
                ten_uuid,
                chr_createdat
            });
            if (!result) {
                throw new Error('No se pudo crear la sala de chat.');
            }
            return result.dataValues as ChatRoomEntity;
        } catch (error: any) {
            console.error('Error en createChatRoom:', error.message);
            throw error;
        }
    }

    async updateChatRoom(cmp_uuid: string, chr_uuid: string, room: ChatRoomUpdateData): Promise<ChatRoomEntity | null> {
        try {
            const [updatedCount, [updatedRoom]] = await SequelizeChatRoom.update(
                {
                    chr_name: room.chr_name,
                    chr_type: room.chr_type,
                    cla_uuid: room.cla_uuid,
                    ten_uuid: room.ten_uuid
                },
                {
                    where: {
                        cmp_uuid,
                        chr_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la sala de chat.');
            }
            return updatedRoom.get({ plain: true }) as ChatRoomEntity;
        } catch (error: any) {
            console.error('Error en updateChatRoom:', error.message);
            throw error;
        }
    }

    async deleteChatRoom(cmp_uuid: string, chr_uuid: string): Promise<ChatRoomEntity | null> {
        try {
            const room = await this.findChatRoomById(cmp_uuid, chr_uuid);
            if (!room) {
                throw new Error(`No existe la sala de chat con ID: ${chr_uuid}`);
            }
            const result = await SequelizeChatRoom.destroy({
                where: {
                    cmp_uuid,
                    chr_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la sala de chat.');
            }
            return room;
        } catch (error: any) {
            console.error('Error en deleteChatRoom:', error.message);
            throw error;
        }
    }
}
