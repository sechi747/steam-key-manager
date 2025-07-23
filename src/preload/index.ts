import type { CdkEntity } from '../renderer/types/cdk'
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  // 数据库操作
  db: {
    getAllCdks: () => ipcRenderer.invoke('db:getAllCdks'),
    addCdk: (cdk: CdkEntity) => ipcRenderer.invoke('db:addCdk', cdk),
    batchAddCdks: (cdks: CdkEntity[]) => ipcRenderer.invoke('db:batchAddCdks', cdks),
    updateCdk: (cdk: Partial<CdkEntity> & { id: string }) => ipcRenderer.invoke('db:updateCdk', cdk),
    deleteCdk: (id: string) => ipcRenderer.invoke('db:deleteCdk', id),
    batchDeleteCdks: (ids: string[]) => ipcRenderer.invoke('db:batchDeleteCdks', ids),
    findCdk: (id: string) => ipcRenderer.invoke('db:findCdk', id),
    searchCdks: (keyword: string) => ipcRenderer.invoke('db:searchCdks', keyword),
    getCdksByStatus: (status: string) => ipcRenderer.invoke('db:getCdksByStatus', status),
    migrateFromLocalStorage: (data: CdkEntity[]) => ipcRenderer.invoke('db:migrateFromLocalStorage', data),
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('electronAPI', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  window.electron = electronAPI
  window.electronAPI = api
}
