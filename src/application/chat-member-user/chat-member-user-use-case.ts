import { ChatMemberUserRepository } from "../../domain/chat-member-user/chat-member-user.repository";
import { ChatMemberUserValue } from "../../domain/chat-member-user/chat-member-user.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ChatMemberUserUseCase {
    constructor(
        private readonly chatMemberUserRepository: ChatMemberUserRepository,
    ) {
        this.getChatMemberUsers = this.getChatMemberUsers.bind(this);
        this.getDetailChatMemberUser = this.getDetailChatMemberUser.bind(this);
        this.createChatMemberUser = this.createChatMemberUser.bind(this);
        this.updateChatMemberUser = this.updateChatMemberUser.bind(this);
        this.deleteChatMemberUser = this.deleteChatMemberUser.bind(this);
    }

    public async getChatMemberUsers(cmp_uuid: string, chr_uuid: string) {
        try {
            const members = await this.chatMemberUserRepository.getChatMemberUsers(cmp_uuid, chr_uuid);
            if (!members) {
                throw new Error('No hay miembros en esta sala de chat.');
            }
            return members.map(member => ({
                cmp_uuid: member.cmp_uuid,
                chr_uuid: member.chr_uuid,
                usr_uuid: member.usr_uuid,
                chmu_joinedat: TimezoneConverter.toIsoStringInTimezone(member.chmu_joinedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getChatMemberUsers (use case):', error.message);
            throw error;
        }
    }

    public async getDetailChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string) {
        try {
            const member = await this.chatMemberUserRepository.findChatMemberUserById(cmp_uuid, chr_uuid, usr_Uuid);
            if (!member) {
                throw new Error(`El usuario ${usr_Uuid} no es miembro de la sala de chat ${chr_uuid}`);
            }
            return {
                cmp_uuid: member.cmp_uuid,
                chr_uuid: member.chr_uuid,
                usr_uuid: member.usr_uuid,
                chmu_joinedat: TimezoneConverter.toIsoStringInTimezone(member.chmu_joinedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailChatMemberUser (use case):', error.message);
            throw error;
        }
    }

    public async createChatMemberUser(body: any) {
        try {
            const memberValue = new ChatMemberUserValue(body);
            const memberCreated = await this.chatMemberUserRepository.createChatMemberUser(memberValue);
            if (!memberCreated) {
                throw new Error('No se pudo agregar al miembro del chat.');
            }
            return {
                cmp_uuid: memberCreated.cmp_uuid,
                chr_uuid: memberCreated.chr_uuid,
                usr_uuid: memberCreated.usr_uuid,
                chmu_joinedat: TimezoneConverter.toIsoStringInTimezone(memberCreated.chmu_joinedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createChatMemberUser (use case):', error.message);
            throw error;
        }
    }

    public async updateChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string, body: any) {
        try {
            const memberUpdated = await this.chatMemberUserRepository.updateChatMemberUser(cmp_uuid, chr_uuid, usr_Uuid, body);
            if (!memberUpdated) {
                throw new Error('No se pudo actualizar el miembro del chat.');
            }
            return {
                cmp_uuid: memberUpdated.cmp_uuid,
                chr_uuid: memberUpdated.chr_uuid,
                usr_uuid: memberUpdated.usr_uuid,
                chmu_joinedat: TimezoneConverter.toIsoStringInTimezone(memberUpdated.chmu_joinedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateChatMemberUser (use case):', error.message);
            throw error;
        }
    }

    public async deleteChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string) {
        try {
            const memberDeleted = await this.chatMemberUserRepository.deleteChatMemberUser(cmp_uuid, chr_uuid, usr_Uuid);
            if (!memberDeleted) {
                throw new Error('No se pudo eliminar al miembro del chat.');
            }
            return {
                cmp_uuid: memberDeleted.cmp_uuid,
                chr_uuid: memberDeleted.chr_uuid,
                usr_uuid: memberDeleted.usr_uuid,
                chmu_joinedat: TimezoneConverter.toIsoStringInTimezone(memberDeleted.chmu_joinedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteChatMemberUser (use case):', error.message);
            throw error;
        }
    }
}
