import { ChatMessageEntity, ChatMessageUpdateData } from "../../../domain/chat-message/chat-message.entity";
import { ChatMessageRepository } from "../../../domain/chat-message/chat-message.repository";
import { SequelizeChatMessage } from "../../model/chat-message/chat-message.model";

export class SequelizeRepository implements ChatMessageRepository {
    async getChatMessages(cmp_uuid: string, chr_uuid: string): Promise<ChatMessageEntity[] | null> {
        try {
            const messages = await SequelizeChatMessage.findAll({
                where: {
                    cmp_uuid,
                    chr_uuid
                },
                order: [['chrmsg_createdat', 'ASC']] // Los mensajes se ordenan del más viejo al más nuevo
            });
            return messages;
        } catch (error: any) {
            console.error('Error en getChatMessages:', error.message);
            throw error;
        }
    }

    async findChatMessageById(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string): Promise<ChatMessageEntity | null> {
        try {
            const message = await SequelizeChatMessage.findOne({
                where: {
                    cmp_uuid,
                    chr_uuid,
                    chrmsg_uuid
                }
            });
            return message ? (message.dataValues as ChatMessageEntity) : null;
        } catch (error: any) {
            console.error('Error en findChatMessageById:', error.message);
            throw error;
        }
    }

    async createChatMessage(message: ChatMessageEntity): Promise<ChatMessageEntity | null> {
        try {
            const { cmp_uuid, chr_uuid, chrmsg_uuid, usr_uuid, chrmsg_text, chrmsg_isread, chrmsg_createdat } = message;
            const result = await SequelizeChatMessage.create({
                cmp_uuid,
                chr_uuid,
                chrmsg_uuid,
                usr_uuid,
                chrmsg_text,
                chrmsg_isread,
                chrmsg_createdat
            });
            if (!result) {
                throw new Error('No se pudo guardar el mensaje de chat.');
            }
            return result.dataValues as ChatMessageEntity;
        } catch (error: any) {
            console.error('Error en createChatMessage:', error.message);
            throw error;
        }
    }

    async updateChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string, message: ChatMessageUpdateData): Promise<ChatMessageEntity | null> {
        try {
            const [updatedCount, [updatedMessage]] = await SequelizeChatMessage.update(
                {
                    chrmsg_text: message.chrmsg_text,
                    chrmsg_isread: message.chrmsg_isread
                },
                {
                    where: {
                        cmp_uuid,
                        chr_uuid,
                        chrmsg_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar el mensaje de chat.');
            }
            return updatedMessage.get({ plain: true }) as ChatMessageEntity;
        } catch (error: any) {
            console.error('Error en updateChatMessage:', error.message);
            throw error;
        }
    }

    async deleteChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string): Promise<ChatMessageEntity | null> {
        try {
            const message = await this.findChatMessageById(cmp_uuid, chr_uuid, chrmsg_uuid);
            if (!message) {
                throw new Error(`No existe el mensaje de chat con ID: ${chrmsg_uuid}`);
            }
            const result = await SequelizeChatMessage.destroy({
                where: {
                    cmp_uuid,
                    chr_uuid,
                    chrmsg_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar el mensaje de chat.');
            }
            return message;
        } catch (error: any) {
            console.error('Error en deleteChatMessage:', error.message);
            throw error;
        }
    }
}
