import { ClaimEntity, ClaimUpdateData } from "./claim.entity";

export interface ClaimRepository {
    getClaims(cmp_uuid: string, cla_uuid: string, filters?: any): Promise<ClaimEntity[] | null>;
    findClaimById(cmp_uuid: string, cla_uuid: string): Promise<ClaimEntity | null>;
    createClaim(Claim: ClaimEntity): Promise<ClaimEntity | null>;
    updateClaim(cmp_uuid: string, cla_uuid: string, Claim: ClaimUpdateData): Promise<ClaimEntity | null>;
    deleteClaim(cmp_uuid: string, cla_uuid: string): Promise<ClaimEntity | null>;
    findClaimByTitle(cmp_uuid: string, cla_title: string): Promise<ClaimEntity | null>;
}