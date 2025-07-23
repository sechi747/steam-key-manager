import type { CdkEntity } from './cdk'

interface ElectronAPI {
  db: {
    getAllCdks: () => Promise<CdkEntity[]>
    addCdk: (cdk: CdkEntity) => Promise<void>
    batchAddCdks: (cdks: CdkEntity[]) => Promise<void>
    updateCdk: (cdk: Partial<CdkEntity> & { id: string }) => Promise<void>
    deleteCdk: (id: string) => Promise<void>
    batchDeleteCdks: (ids: string[]) => Promise<void>
    findCdk: (id: string) => Promise<CdkEntity | undefined>
    searchCdks: (keyword: string) => Promise<CdkEntity[]>
    getCdksByStatus: (status: string) => Promise<CdkEntity[]>
  }
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
