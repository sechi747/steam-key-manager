import type { CdkEntity } from '@/types/cdk'
import { useLocalStorage } from '@vueuse/core'

export function useCdkEntityStorage() {
  const cdkList = useLocalStorage<CdkEntity[]>('cdkList', [])

  const addCdkEntity = (entity: CdkEntity) => {
    cdkList.value.push(entity)
  }

  const batchAddCdkEntity = (entities: CdkEntity[]) => {
    cdkList.value = [...cdkList.value, ...entities]
  }

  const deleteCdkEntity = (id: string) => {
    cdkList.value = cdkList.value.filter(item => item.id !== id)
  }

  const batchDeleteCdkEntity = (ids: string[]) => {
    cdkList.value = cdkList.value.filter(item => !ids.includes(item.id))
  }

  const updateCdkEntity = (updatedCdk: CdkEntity) => {
    const index = cdkList.value.findIndex(item => item.id === updatedCdk.id)
    if (index !== -1) {
      cdkList.value[index] = updatedCdk
    }
  }

  const getCdkEntity = (id: string): CdkEntity | undefined => {
    return cdkList.value.find(item => item.id === id)
  }

  return {
    cdkList,
    addCdkEntity,
    batchAddCdkEntity,
    deleteCdkEntity,
    batchDeleteCdkEntity,
    updateCdkEntity,
    getCdkEntity,
  }
}
