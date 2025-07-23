import type { CdkEntity } from '@renderer/types/cdk'
import { createSharedComposable } from '@vueuse/core'

export const useCdkEntityStorage = createSharedComposable(() => {
  const cdkList = ref<CdkEntity[]>([])

  const loadCdks = async () => {
    console.log('loadCdks')
    try {
      cdkList.value = await window.electronAPI.db.getAllCdks()
    }
    catch (error) {
      console.error('加载 CDK 数据失败:', error)
    }
  }

  const addCdk = async (entity: CdkEntity) => {
    try {
      await window.electronAPI.db.addCdk(entity)
      await loadCdks()
    }
    catch (error) {
      console.error('添加 CDK 失败:', error)
    }
  }

  const batchAddCdk = async (entities: CdkEntity[]) => {
    try {
      await window.electronAPI.db.batchAddCdks(entities)
      await loadCdks()
    }
    catch (error) {
      console.error('批量添加 CDK 失败:', error)
    }
  }

  const editCdk = async (updatedCdk: Partial<CdkEntity> & { id: string }) => {
    try {
      await window.electronAPI.db.updateCdk(updatedCdk)
      await loadCdks()
    }
    catch (error) {
      console.error('编辑 CDK 失败:', error)
    }
  }

  const deleteCdk = async (id: string) => {
    try {
      await window.electronAPI.db.deleteCdk(id)
      await loadCdks()
    }
    catch (error) {
      console.error('删除 CDK 失败:', error)
    }
  }

  const batchDeleteCdk = async (ids: string[]) => {
    try {
      await window.electronAPI.db.batchDeleteCdks(ids)
      await loadCdks()
    }
    catch (error) {
      console.error('批量删除 CDK 失败:', error)
    }
  }

  const findCdk = async (id: string): Promise<CdkEntity | undefined> => {
    try {
      return await window.electronAPI.db.findCdk(id)
    }
    catch (error) {
      console.error('查找 CDK 失败:', error)
      return undefined
    }
  }

  // 新增功能：搜索
  const searchCdks = async (keyword: string): Promise<CdkEntity[]> => {
    try {
      return await window.electronAPI.db.searchCdks(keyword)
    }
    catch (error) {
      console.error('搜索 CDK 失败:', error)
      return []
    }
  }

  // 新增功能：按状态筛选
  const getCdksByStatus = async (status: string): Promise<CdkEntity[]> => {
    try {
      return await window.electronAPI.db.getCdksByStatus(status)
    }
    catch (error) {
      console.error('按状态筛选 CDK 失败:', error)
      return []
    }
  }

  onMounted(async () => {
    await loadCdks()
  })

  return {
    cdkList,
    loadCdks,
    addCdk,
    batchAddCdk,
    editCdk,
    deleteCdk,
    batchDeleteCdk,
    findCdk,
    searchCdks,
    getCdksByStatus,
  }
})
