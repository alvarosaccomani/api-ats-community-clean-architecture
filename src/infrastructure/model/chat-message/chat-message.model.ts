import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ChatMessageEntity } from "../../../domain/chat-message/chat-message.entity";

export class SequelizeChatMessage extends Model<ChatMessageEntity, Omit<ChatMessageEntity, 'id'>> {
  declare cmp_uuid: string;
  declare chr_uuid: string;
  declare chrmsg_uuid: string;
  declare usr_uuid: string;
  declare chrmsg_text: string;
  declare chrmsg_isread: boolean;
  declare chrmsg_createdat: Date;
}

SequelizeChatMessage.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chrmsg_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chrmsg_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  chrmsg_isread: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  chrmsg_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'chrmsg_createdat',
  updatedAt: false,
  tableName: 'chrmsg_chatmessages'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeChatMessage.sync();
}
