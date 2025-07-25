import { join } from 'node:path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron'
import { dbManager } from './database'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#242424' : '#ffffff',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  })

  nativeTheme.themeSource = 'system'

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 监听系统主题变化
nativeTheme.on('updated', () => {
  const allWindows = BrowserWindow.getAllWindows()
  for (const window of allWindows) {
    window.setBackgroundColor(nativeTheme.shouldUseDarkColors ? '#242424' : '#ffffff')
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 注册数据库 IPC 处理器
  ipcMain.handle('db:getAllCdks', () => dbManager.getAllCdks())
  ipcMain.handle('db:addCdk', (_, cdk) => dbManager.addCdk(cdk))
  ipcMain.handle('db:batchAddCdks', (_, cdks) => dbManager.batchAddCdks(cdks))
  ipcMain.handle('db:updateCdk', (_, cdk) => dbManager.updateCdk(cdk))
  ipcMain.handle('db:deleteCdk', (_, id) => dbManager.deleteCdk(id))
  ipcMain.handle('db:batchDeleteCdks', (_, ids) => dbManager.batchDeleteCdks(ids))
  ipcMain.handle('db:findCdk', (_, id) => dbManager.findCdk(id))
  ipcMain.handle('db:searchCdks', (_, keyword) => dbManager.searchCdks(keyword))
  ipcMain.handle('db:getCdksByStatus', (_, status) => dbManager.getCdksByStatus(status))

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用退出时关闭数据库
app.on('before-quit', () => {
  dbManager.close()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
