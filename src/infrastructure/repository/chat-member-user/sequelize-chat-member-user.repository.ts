import { ChatMemberUserEntity, ChatMemberUserUpdateData } from "../../../domain/chat-member-user/chat-member-user.entity";
import { ChatMemberUserRepository } from "../../../domain/chat-member-user/chat-member-user.repository";
import { SequelizeChatMemberUser } from "../../model/chat-member-user/chat-member-user.model";

export class SequelizeRepository implements ChatMemberUserRepository {
    async getChatMemberUsers(cmp_uuid: string, chr_uuid: string): Promise<ChatMemberUserEntity[] | null> {
        try {
            const members = await SequelizeChatMemberUser.findAll({
                where: {
                    cmp_uuid,
                    chr_uuid
                }
            });
            return members;
        } catch (error: any) {
            console.error('Error en getChatMemberUsers:', error.message);
            throw error;
        }
    }

    async findChatMemberUserById(cmp_uuid: string, chr_uuid: string, usr_Uuid: string): Promise<ChatMemberUserEntity | null> {
        try {
            const member = await SequelizeChatMemberUser.findOne({
                where: {
                    cmp_uuid,
                    chr_uuid,
                    usr_uuid: usr_Uuid
                }
            });
            return member ? (member.dataValues as ChatMemberUserEntity) : null;
        } catch (error: any) {
            console.error('Error en findChatMemberUserById:', error.message);
            throw error;
        }
    }

    async createChatMemberUser(chatMemberUser: ChatMemberUserEntity): Promise<ChatMemberUserEntity | null> {
        try {
            const { cmp_uuid, chr_uuid, usr_uuid, chmu_joinedat } = chatMemberUser;
            const result = await SequelizeChatMemberUser.create({
                cmp_uuid,
                chr_uuid,
                usr_uuid,
                chmu_joinedat
            });
            if (!result) {
                throw new Error('No se pudo registrar el miembro del chat.');
            }
            return result.dataValues as ChatMemberUserEntity;
        } catch (error: any) {
            console.error('Error en createChatMemberUser:', error.message);
            throw error;
        }
    }

    async updateChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string, chatMemberUser: ChatMemberUserUpdateData): Promise<ChatMemberUserEntity | null> {
        try {
            const [updatedCount, [updatedMember]] = await SequelizeChatMemberUser.update(
                {
                    chmu_joinedat: chatMemberUser.chmu_joinedat
                },
                {
                    where: {
                        cmp_uuid,
                        chr_uuid,
                        usr_uuid: usr_Uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar el miembro del chat.');
            }
            return updatedMember.get({ plain: true }) as ChatMemberUserEntity;
        } catch (error: any) {
            console.error('Error en updateChatMemberUser:', error.message);
            throw error;
        }
    }

    async deleteChatMemberUser(cmp_uuid: string, chr_uuid: string, usr_Uuid: string): Promise<ChatMemberUserEntity | null> {
        try {
            const member = await this.findChatMemberUserById(cmp_uuid, chr_uuid, usr_Uuid);
            if (!member) {
                throw new Error(`No existe la asignación de miembro de chat para el usuario: ${usr_Uuid} en la sala: ${chr_uuid}`);
            }
            const result = await SequelizeChatMemberUser.destroy({
                where: {
                    cmp_uuid,
                    chr_uuid,
                    usr_uuid: usr_Uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar el miembro del chat.');
            }
            return member;
        } catch (error: any) {
            console.error('Error en deleteChatMemberUser:', error.message);
            throw error;
        }
    }
}
