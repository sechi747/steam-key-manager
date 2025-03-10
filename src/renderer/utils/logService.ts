import { useLocalStorage } from '@vueuse/core'

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  id: string
  timestamp: number
  level: LogLevel
  message: string
  data?: any
}

// 最大日志条目数
const MAX_LOG_ENTRIES = 1000

export class LogService {
  private logs = useLocalStorage<LogEntry[]>('app_logs', [])

  private addLog(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level,
      message,
      data,
    }

    this.logs.value = [entry, ...this.logs.value.slice(0, MAX_LOG_ENTRIES - 1)]

    console[level](message, data)

    return entry
  }

  debug(message: string, data?: any) {
    return this.addLog(LogLevel.DEBUG, message, data)
  }

  info(message: string, data?: any) {
    return this.addLog(LogLevel.INFO, message, data)
  }

  warn(message: string, data?: any) {
    return this.addLog(LogLevel.WARN, message, data)
  }

  error(message: string, data?: any) {
    return this.addLog(LogLevel.ERROR, message, data)
  }

  // 获取所有日志
  getLogs() {
    return this.logs.value
  }

  // 清除日志
  clearLogs() {
    this.logs.value = []
  }

  // 导出日志
  exportLogs() {
    return JSON.stringify(this.logs.value, null, 2)
  }
}

// 创建单例实例
export const logService = new LogService()
