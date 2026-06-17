import { SpaceRepository } from "../../domain/space/space.repository";
import { SpaceValue } from "../../domain/space/space.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class SpaceUseCase {
    constructor(
        private readonly spaceRepository: SpaceRepository,
    ) {
        this.getSpacesBySite = this.getSpacesBySite.bind(this);
        this.getSpaces = this.getSpaces.bind(this);
        this.getDetailSpace = this.getDetailSpace.bind(this);
        this.createSpace = this.createSpace.bind(this);
        this.updateSpace = this.updateSpace.bind(this);
        this.deleteSpace = this.deleteSpace.bind(this);
    }

    public async getSpacesBySite(cmp_uuid: string, sit_uuid: string) {
        try {
            const spaces = await this.spaceRepository.getSpacesBySite(cmp_uuid, sit_uuid);
            if (!spaces) {
                throw new Error('No hay espacios.');
            }
            return spaces.map(space => ({
                cmp_uuid: space.cmp_uuid,
                sit_uuid: space.sit_uuid,
                spa_uuid: space.spa_uuid,
                spa_code: space.spa_code,
                spa_name: space.spa_name,
                spa_type: space.spa_type,
                spa_capacity: space.spa_capacity,
                spa_cost: space.spa_cost,
                spa_status: space.spa_status,
                site: space.site ? {
                    sit_uuid: space.site.sit_uuid,
                    sit_name: space.site.sit_name
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getSpacesBySite (use case):', error.message);
            throw error;
        }
    }

    public async getSpaces(cmp_uuid: string) {
        try {
            const spaces = await this.spaceRepository.getSpaces(cmp_uuid);
            if (!spaces) {
                throw new Error('No hay espacios.');
            }
            return spaces.map(space => ({
                cmp_uuid: space.cmp_uuid,
                sit_uuid: space.sit_uuid,
                spa_uuid: space.spa_uuid,
                spa_code: space.spa_code,
                spa_name: space.spa_name,
                spa_type: space.spa_type,
                spa_capacity: space.spa_capacity,
                spa_cost: space.spa_cost,
                spa_status: space.spa_status,
                site: space.site ? {
                    sit_uuid: space.site.sit_uuid,
                    sit_name: space.site.sit_name
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getSpaces (use case):', error.message);
            throw error;
        }
    }

    public async getDetailSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string) {
        try {
            const space = await this.spaceRepository.findSpaceById(cmp_uuid, sit_uuid, spa_uuid);
            if (!space) {
                throw new Error(`No hay espacio con ID: ${spa_uuid}`);
            }
            return {
                cmp_uuid: space.cmp_uuid,
                sit_uuid: space.sit_uuid,
                spa_uuid: space.spa_uuid,
                spa_code: space.spa_code,
                spa_name: space.spa_name,
                spa_type: space.spa_type,
                spa_capacity: space.spa_capacity,
                spa_cost: space.spa_cost,
                spa_status: space.spa_status,
                site: space.site ? {
                    sit_uuid: space.site.sit_uuid,
                    sit_name: space.site.sit_name
                } : undefined
            };
        } catch (error: any) {
            console.error('Error en getDetailSpace (use case):', error.message);
            throw error;
        }
    }

    public async createSpace({ cmp_uuid, sit_uuid, spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status }: { cmp_uuid: string, sit_uuid: string, spa_code: string, spa_name: string, spa_type: 'Reservable' | 'General', spa_capacity?: number | null, spa_cost?: number | null, spa_status?: 'Active' | 'Maintenance' | 'Inactive' }) {
        try {
            const spaceValue = new SpaceValue({ cmp_uuid, sit_uuid, spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status });
            const spaceCreated = await this.spaceRepository.createSpace(spaceValue);
            if (!spaceCreated) {
                throw new Error('No se pudo insertar el espacio.');
            }
            return {
                cmp_uuid: spaceCreated.cmp_uuid,
                spa_uuid: spaceCreated.spa_uuid,
                sit_uuid: spaceCreated.sit_uuid,
                spa_code: spaceCreated.spa_code,
                spa_name: spaceCreated.spa_name,
                spa_type: spaceCreated.spa_type,
                spa_capacity: spaceCreated.spa_capacity,
                spa_cost: spaceCreated.spa_cost,
                spa_status: spaceCreated.spa_status,
            };
        } catch (error: any) {
            console.error('Error en createSpace (use case):', error.message);
            throw error;
        }
    }

    public async updateSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string, { spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status }: { spa_code: string, spa_name: string, spa_type: 'Reservable' | 'General', spa_capacity?: number | null, spa_cost?: number | null, spa_status: 'Active' | 'Maintenance' | 'Inactive' }) {
        try {
            const spaceUpdated = await this.spaceRepository.updateSpace(cmp_uuid, sit_uuid, spa_uuid, { spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status });
            if (!spaceUpdated) {
                throw new Error('No se pudo actualizar el espacio.');
            }
            return {
                cmp_uuid: spaceUpdated.cmp_uuid,
                spa_uuid: spaceUpdated.spa_uuid,
                sit_uuid: spaceUpdated.sit_uuid,
                spa_code: spaceUpdated.spa_code,
                spa_name: spaceUpdated.spa_name,
                spa_type: spaceUpdated.spa_type,
                spa_capacity: spaceUpdated.spa_capacity,
                spa_cost: spaceUpdated.spa_cost,
                spa_status: spaceUpdated.spa_status,
            };
        } catch (error: any) {
            console.error('Error en updateSpace (use case):', error.message);
            throw error;
        }
    }

    public async deleteSpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string) {
        try {
            const spaceDeleted = await this.spaceRepository.deleteSpace(cmp_uuid, sit_uuid, spa_uuid);
            if (!spaceDeleted) {
                throw new Error('No se pudo eliminar el espacio.');
            }
            return {
                cmp_uuid: spaceDeleted.cmp_uuid,
                spa_uuid: spaceDeleted.spa_uuid,
                sit_uuid: spaceDeleted.sit_uuid,
                spa_code: spaceDeleted.spa_code,
                spa_name: spaceDeleted.spa_name,
                spa_type: spaceDeleted.spa_type,
                spa_capacity: spaceDeleted.spa_capacity,
                spa_cost: spaceDeleted.spa_cost,
                spa_status: spaceDeleted.spa_status,
            };
        } catch (error: any) {
            console.error('Error en deleteSpace (use case):', error.message);
            throw error;
        }
    }
}
