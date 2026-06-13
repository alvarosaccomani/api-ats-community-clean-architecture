import { ChatMessageRepository } from "../../domain/chat-message/chat-message.repository";
import { ChatMessageValue } from "../../domain/chat-message/chat-message.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ChatMessageUseCase {
    constructor(
        private readonly chatMessageRepository: ChatMessageRepository,
    ) {
        this.getChatMessages = this.getChatMessages.bind(this);
        this.getDetailChatMessage = this.getDetailChatMessage.bind(this);
        this.createChatMessage = this.createChatMessage.bind(this);
        this.updateChatMessage = this.updateChatMessage.bind(this);
        this.deleteChatMessage = this.deleteChatMessage.bind(this);
    }

    public async getChatMessages(cmp_uuid: string, chr_uuid: string) {
        try {
            const messages = await this.chatMessageRepository.getChatMessages(cmp_uuid, chr_uuid);
            if (!messages) {
                throw new Error('No hay mensajes en esta sala.');
            }
            return messages.map(msg => ({
                cmp_uuid: msg.cmp_uuid,
                chr_uuid: msg.chr_uuid,
                chrmsg_uuid: msg.chrmsg_uuid,
                usr_uuid: msg.usr_uuid,
                chrmsg_text: msg.chrmsg_text,
                chrmsg_isread: msg.chrmsg_isread,
                chrmsg_createdat: TimezoneConverter.toIsoStringInTimezone(msg.chrmsg_createdat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getChatMessages (use case):', error.message);
            throw error;
        }
    }

    public async getDetailChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string) {
        try {
            const msg = await this.chatMessageRepository.findChatMessageById(cmp_uuid, chr_uuid, chrmsg_uuid);
            if (!msg) {
                throw new Error(`No hay mensaje con ID: ${chrmsg_uuid}`);
            }
            return {
                cmp_uuid: msg.cmp_uuid,
                chr_uuid: msg.chr_uuid,
                chrmsg_uuid: msg.chrmsg_uuid,
                usr_uuid: msg.usr_uuid,
                chrmsg_text: msg.chrmsg_text,
                chrmsg_isread: msg.chrmsg_isread,
                chrmsg_createdat: TimezoneConverter.toIsoStringInTimezone(msg.chrmsg_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailChatMessage (use case):', error.message);
            throw error;
        }
    }

    public async createChatMessage(body: any) {
        try {
            const messageValue = new ChatMessageValue(body);
            const messageCreated = await this.chatMessageRepository.createChatMessage(messageValue);
            if (!messageCreated) {
                throw new Error('No se pudo registrar el mensaje de chat.');
            }
            return {
                cmp_uuid: messageCreated.cmp_uuid,
                chr_uuid: messageCreated.chr_uuid,
                chrmsg_uuid: messageCreated.chrmsg_uuid,
                usr_uuid: messageCreated.usr_uuid,
                chrmsg_text: messageCreated.chrmsg_text,
                chrmsg_isread: messageCreated.chrmsg_isread,
                chrmsg_createdat: TimezoneConverter.toIsoStringInTimezone(messageCreated.chrmsg_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createChatMessage (use case):', error.message);
            throw error;
        }
    }

    public async updateChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string, body: any) {
        try {
            const messageUpdated = await this.chatMessageRepository.updateChatMessage(cmp_uuid, chr_uuid, chrmsg_uuid, body);
            if (!messageUpdated) {
                throw new Error('No se pudo actualizar el mensaje de chat.');
            }
            return {
                cmp_uuid: messageUpdated.cmp_uuid,
                chr_uuid: messageUpdated.chr_uuid,
                chrmsg_uuid: messageUpdated.chrmsg_uuid,
                usr_uuid: messageUpdated.usr_uuid,
                chrmsg_text: messageUpdated.chrmsg_text,
                chrmsg_isread: messageUpdated.chrmsg_isread,
                chrmsg_createdat: TimezoneConverter.toIsoStringInTimezone(messageUpdated.chrmsg_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateChatMessage (use case):', error.message);
            throw error;
        }
    }

    public async deleteChatMessage(cmp_uuid: string, chr_uuid: string, chrmsg_uuid: string) {
        try {
            const messageDeleted = await this.chatMessageRepository.deleteChatMessage(cmp_uuid, chr_uuid, chrmsg_uuid);
            if (!messageDeleted) {
                throw new Error('No se pudo eliminar el mensaje de chat.');
            }
            return {
                cmp_uuid: messageDeleted.cmp_uuid,
                chr_uuid: messageDeleted.chr_uuid,
                chrmsg_uuid: messageDeleted.chrmsg_uuid,
                usr_uuid: messageDeleted.usr_uuid,
                chrmsg_text: messageDeleted.chrmsg_text,
                chrmsg_isread: messageDeleted.chrmsg_isread,
                chrmsg_createdat: TimezoneConverter.toIsoStringInTimezone(messageDeleted.chrmsg_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteChatMessage (use case):', error.message);
            throw error;
        }
    }
}
