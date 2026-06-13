import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ChatMemberUserEntity } from "../../../domain/chat-member-user/chat-member-user.entity";

export class SequelizeChatMemberUser extends Model<ChatMemberUserEntity, Omit<ChatMemberUserEntity, 'id'>> {
  declare cmp_uuid: string;
  declare chr_uuid: string;
  declare usr_uuid: string;
  declare chmu_joinedat: Date;
}

SequelizeChatMemberUser.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  chr_uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  chmu_joinedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'chmu_joinedat',
  updatedAt: false,
  tableName: 'chmu_chatmemberusers'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeChatMemberUser.sync();
}
