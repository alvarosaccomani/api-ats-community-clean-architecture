import { ClaimImageEntity, ClaimImageUpdateData } from "./claim-image.entity";

export interface ClaimImageRepository {
    getClaimImages(cmp_uuid: string, cla_uuid: string): Promise<ClaimImageEntity[] | null>;
    findClaimImageById(cmp_uuid: string, cla_uuid: string, claimg_uuid: string): Promise<ClaimImageEntity | null>;
    createClaimImage(ClaimImage: ClaimImageEntity): Promise<ClaimImageEntity | null>;
    updateClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string, ClaimImage: ClaimImageUpdateData): Promise<ClaimImageEntity | null>;
    deleteClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string): Promise<ClaimImageEntity | null>;
}