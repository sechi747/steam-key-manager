import type { CdkEntity } from '@renderer/types/cdk'
import { useLocalStorage } from '@vueuse/core'

export function useCdkEntityStorage() {
  const cdkList = useLocalStorage<CdkEntity[]>('cdkList', [])

  const addCdk = (entity: CdkEntity) => {
    cdkList.value.push(entity)
  }

  const batchAddCdk = (entities: CdkEntity[]) => {
    cdkList.value = [...cdkList.value, ...entities]
  }

  const deleteCdk = (id: string) => {
    cdkList.value = cdkList.value.filter(item => item.id !== id)
  }

  const batchDeleteCdk = (ids: string[]) => {
    cdkList.value = cdkList.value.filter(item => !ids.includes(item.id))
  }

  const editCdk = (updatedCdk: CdkEntity) => {
    const index = cdkList.value.findIndex(item => item.id === updatedCdk.id)
    if (index !== -1) {
      cdkList.value[index] = {
        ...cdkList.value[index],
        ...updatedCdk,
      }
    }
  }

  const findCdk = (id: string): CdkEntity | undefined => {
    return cdkList.value.find(item => item.id === id)
  }

  return {
    cdkList,
    addCdk,
    batchAddCdk,
    deleteCdk,
    batchDeleteCdk,
    editCdk,
    findCdk,
  }
}
