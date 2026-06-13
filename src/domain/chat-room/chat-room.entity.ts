export interface ChatRoomEntity {
    cmp_uuid: string;
    chr_uuid: string;
    chr_name: string;
    chr_type: 'Reclamos' | 'Consorcio' | 'Licitación';
    cla_uuid: string;
    ten_uuid: string;
    chr_createdat: Date
}

//Update
export type ChatRoomUpdateData = Pick<ChatRoomEntity, 'chr_name' | 'chr_type' | 'cla_uuid' | 'ten_uuid'>;