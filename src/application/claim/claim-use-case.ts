import { ClaimRepository } from "../../domain/claim/claim.repository";
import { ClaimValue } from "../../domain/claim/claim.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ClaimUseCase {
    constructor(
        private readonly claimRepository: ClaimRepository,
    ) {
        this.getClaims = this.getClaims.bind(this);
        this.getDetailClaim = this.getDetailClaim.bind(this);
        this.createClaim = this.createClaim.bind(this);
        this.updateClaim = this.updateClaim.bind(this);
        this.deleteClaim = this.deleteClaim.bind(this);
        this.findClaimByTitle = this.findClaimByTitle.bind(this);
    }

    public async getClaims(cmp_uuid: string, cla_uuid: string, filters?: any) {
        try {
            const claims = await this.claimRepository.getClaims(cmp_uuid, cla_uuid, filters);
            if (!claims) {
                throw new Error('No hay reclamos.');
            }
             return claims.map(claim => ({
                cmp_uuid: claim.cmp_uuid,
                cla_uuid: claim.cla_uuid,
                usr_uuid: claim.usr_uuid,
                uni_uuid: claim.uni_uuid,
                cla_title: claim.cla_title,
                cla_description: claim.cla_description,
                cla_type: claim.cla_type,
                cla_status: claim.cla_status,
                cla_priority: claim.cla_priority,
                cla_createdat: TimezoneConverter.toIsoStringInTimezone(claim.cla_createdat, 'America/Buenos_Aires'),
                cla_updatedat: TimezoneConverter.toIsoStringInTimezone(claim.cla_updatedat, 'America/Buenos_Aires'),
                usr: claim.usr ? {
                    usr_uuid: claim.usr.usr_uuid,
                    usr_name: claim.usr.usr_name,
                    usr_surname: claim.usr.usr_surname,
                    usr_email: claim.usr.usr_email
                } : undefined,
                unit: claim.unit ? {
                    uni_uuid: claim.unit.uni_uuid,
                    uni_code: claim.unit.uni_code,
                    uni_category: claim.unit.uni_category
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getClaims (use case):', error.message);
            throw error;
        }
    }

    public async getDetailClaim(cmp_uuid: string, cla_uuid: string) {
        try {
            const claim = await this.claimRepository.findClaimById(cmp_uuid, cla_uuid);
            if (!claim) {
                throw new Error(`No hay reclamo con ID: ${cla_uuid}`);
            }
            return {
                cmp_uuid: claim.cmp_uuid,
                cla_uuid: claim.cla_uuid,
                usr_uuid: claim.usr_uuid,
                uni_uuid: claim.uni_uuid,
                cla_title: claim.cla_title,
                cla_description: claim.cla_description,
                cla_type: claim.cla_type,
                cla_status: claim.cla_status,
                cla_priority: claim.cla_priority,
                cla_createdat: TimezoneConverter.toIsoStringInTimezone(claim.cla_createdat, 'America/Buenos_Aires'),
                cla_updatedat: TimezoneConverter.toIsoStringInTimezone(claim.cla_updatedat, 'America/Buenos_Aires'),
                usr: claim.usr ? {
                    usr_uuid: claim.usr.usr_uuid,
                    usr_name: claim.usr.usr_name,
                    usr_surname: claim.usr.usr_surname,
                    usr_email: claim.usr.usr_email
                } : undefined,
                unit: claim.unit ? {
                    uni_uuid: claim.unit.uni_uuid,
                    uni_code: claim.unit.uni_code,
                    uni_category: claim.unit.uni_category
                } : undefined
            };
        } catch (error: any) {
            console.error('Error en getDetailClaim (use case):', error.message);
            throw error;
        }
    }

    public async createClaim({ cmp_uuid, cla_uuid, usr_uuid, uni_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority } : { cmp_uuid: string, cla_uuid: string, usr_uuid: string, uni_uuid: string, cla_title: string, cla_description: string, cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta', cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado', cla_priority?: 'Baja' | 'Media' | 'Alta' }) {
        try {
            const claimValue = new ClaimValue({ cmp_uuid, cla_uuid, usr_uuid, uni_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority });
            const claimCreated = await this.claimRepository.createClaim(claimValue);
            if (!claimCreated) {
                throw new Error('No se pudo insertar el reclamo.');
            }
            return {
                cmp_uuid: claimCreated.cmp_uuid,
                cla_uuid: claimCreated.cla_uuid,
                usr_uuid: claimCreated.usr_uuid,
                uni_uuid: claimCreated.uni_uuid,
                cla_title: claimCreated.cla_title,
                cla_description: claimCreated.cla_description,
                cla_type: claimCreated.cla_type,
                cla_status: claimCreated.cla_status,
                cla_priority: claimCreated.cla_priority,
                cla_createdat: TimezoneConverter.toIsoStringInTimezone(claimCreated.cla_createdat, 'America/Buenos_Aires'),
                cla_updatedat: TimezoneConverter.toIsoStringInTimezone(claimCreated.cla_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createClaim (use case):', error.message);
            throw error;
        }
    }

    public async updateClaim(cmp_uuid: string, cla_uuid: string, { usr_uuid, uni_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority } : { usr_uuid: string, uni_uuid: string, cla_title: string, cla_description: string, cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta', cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado', cla_priority: 'Baja' | 'Media' | 'Alta' }) {
        try {
            const claimUpdated = await this.claimRepository.updateClaim(cmp_uuid, cla_uuid, { usr_uuid, uni_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority });
            if (!claimUpdated) {
                throw new Error('No se pudo actualizar el reclamo.');
            }
            return {
                cmp_uuid: claimUpdated.cmp_uuid,
                cla_uuid: claimUpdated.cla_uuid,
                usr_uuid: claimUpdated.usr_uuid,
                uni_uuid: claimUpdated.uni_uuid,
                cla_title: claimUpdated.cla_title,
                cla_description: claimUpdated.cla_description,
                cla_type: claimUpdated.cla_type,
                cla_status: claimUpdated.cla_status,
                cla_priority: claimUpdated.cla_priority,
                cla_createdat: TimezoneConverter.toIsoStringInTimezone(claimUpdated.cla_createdat, 'America/Buenos_Aires'),
                cla_updatedat: TimezoneConverter.toIsoStringInTimezone(claimUpdated.cla_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateClaim (use case):', error.message);
            throw error;
        }
    }

    public async deleteClaim(cmp_uuid: string, cla_uuid: string) {
        try {
            const claimDeleted = await this.claimRepository.deleteClaim(cmp_uuid, cla_uuid);
            if (!claimDeleted) {
                throw new Error('No se pudo eliminar el reclamo.');
            }
            return {
                cmp_uuid: claimDeleted.cmp_uuid,
                cla_uuid: claimDeleted.cla_uuid,
                usr_uuid: claimDeleted.usr_uuid,
                uni_uuid: claimDeleted.uni_uuid,
                cla_title: claimDeleted.cla_title,
                cla_description: claimDeleted.cla_description,
                cla_type: claimDeleted.cla_type,
                cla_status: claimDeleted.cla_status,
                cla_priority: claimDeleted.cla_priority,
                cla_createdat: TimezoneConverter.toIsoStringInTimezone(claimDeleted.cla_createdat, 'America/Buenos_Aires'),
                cla_updatedat: TimezoneConverter.toIsoStringInTimezone(claimDeleted.cla_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteClaim (use case):', error.message);
            throw error;
        }
    }

    public async findClaimByTitle(cmp_uuid: string, cla_title: string) {
        try {
            const claim = await this.claimRepository.findClaimByTitle(cmp_uuid, cla_title);
            if (!claim) {
                throw new Error(`No se encontró el reclamo con el título: ${cla_title}`);
            }
            return claim;
        } catch (error: any) {
            console.error('Error en findClaimByTitle (use case):', error.message);
            throw error;
        }
    }
}
