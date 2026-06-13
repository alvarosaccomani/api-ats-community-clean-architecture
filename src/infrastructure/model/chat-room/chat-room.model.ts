import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ChatRoomEntity } from "../../../domain/chat-room/chat-room.entity";

export class SequelizeChatRoom extends Model<ChatRoomEntity, Omit<ChatRoomEntity, 'id'>> {
  declare cmp_uuid: string;
  declare chr_uuid: string;
  declare chr_name: string;
  declare chr_type: 'Reclamos' | 'Consorcio' | 'Licitación';
  declare cla_uuid: string;
  declare ten_uuid: string;
  declare chr_createdat: Date;
}

SequelizeChatRoom.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chr_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  chr_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chr_type: {
    type: DataTypes.STRING, // 'Reclamos' | 'Consorcio' | 'Licitación'
    allowNull: false
  },
  cla_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ten_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  chr_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'chr_createdat',
  updatedAt: false,
  tableName: 'chr_chatrooms'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeChatRoom.sync();
}
