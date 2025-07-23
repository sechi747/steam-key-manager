import type { CdkEntity } from '../renderer/types/cdk'
import { join } from 'node:path'
import Database from 'better-sqlite3'
import { app } from 'electron'

class DatabaseManager {
  private db: Database.Database

  constructor() {
    const dbPath = join(app.getPath('userData'), 'steam-keys.db')
    this.db = new Database(dbPath)
    this.initTables()
  }

  private initTables() {
    // CDK 表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cdks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        cdk TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL CHECK (status IN ('isUnused', 'isUsed', 'isPending')),
        remark TEXT DEFAULT '',
        createAt INTEGER NOT NULL,
        updateAt INTEGER NOT NULL
      )
    `)

    // 慈善包表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        purchaseDate INTEGER NOT NULL
      )
    `)

    // CDK-Package 关联表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS package_cdks (
        packageId TEXT,
        cdkId TEXT,
        PRIMARY KEY (packageId, cdkId),
        FOREIGN KEY (packageId) REFERENCES packages(id),
        FOREIGN KEY (cdkId) REFERENCES cdks(id)
      )
    `)

    // 创建索引
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_cdks_status ON cdks(status)')
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_cdks_name ON cdks(name)')
  }

  // CDK 操作
  getAllCdks(): CdkEntity[] {
    const stmt = this.db.prepare('SELECT * FROM cdks ORDER BY updateAt DESC')
    return stmt.all() as CdkEntity[]
  }

  addCdk(cdk: CdkEntity): void {
    const stmt = this.db.prepare(`
      INSERT INTO cdks (id, name, cdk, status, remark, createAt, updateAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(cdk.id, cdk.name, cdk.cdk, cdk.status, cdk.remark, cdk.createAt, cdk.updateAt)
  }

  batchAddCdks(cdks: CdkEntity[]): void {
    const stmt = this.db.prepare(`
      INSERT INTO cdks (id, name, cdk, status, remark, createAt, updateAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const transaction = this.db.transaction((cdks: CdkEntity[]) => {
      for (const cdk of cdks) {
        stmt.run(cdk.id, cdk.name, cdk.cdk, cdk.status, cdk.remark, cdk.createAt, cdk.updateAt)
      }
    })

    transaction(cdks)
  }

  updateCdk(cdk: Partial<CdkEntity> & { id: string }): void {
    const stmt = this.db.prepare(`
      UPDATE cdks SET name = ?, cdk = ?, status = ?, remark = ?, updateAt = ?
      WHERE id = ?
    `)
    stmt.run(cdk.name, cdk.cdk, cdk.status, cdk.remark, cdk.updateAt, cdk.id)
  }

  deleteCdk(id: string): void {
    const stmt = this.db.prepare('DELETE FROM cdks WHERE id = ?')
    stmt.run(id)
  }

  batchDeleteCdks(ids: string[]): void {
    const placeholders = ids.map(() => '?').join(',')
    const stmt = this.db.prepare(`DELETE FROM cdks WHERE id IN (${placeholders})`)
    stmt.run(...ids)
  }

  findCdk(id: string): CdkEntity | undefined {
    const stmt = this.db.prepare('SELECT * FROM cdks WHERE id = ?')
    return stmt.get(id) as CdkEntity | undefined
  }

  searchCdks(keyword: string): CdkEntity[] {
    const stmt = this.db.prepare(`
      SELECT * FROM cdks 
      WHERE name LIKE ? OR cdk LIKE ?
      ORDER BY updateAt DESC
    `)
    return stmt.all(`%${keyword}%`, `%${keyword}%`) as CdkEntity[]
  }

  getCdksByStatus(status: string): CdkEntity[] {
    const stmt = this.db.prepare('SELECT * FROM cdks WHERE status = ? ORDER BY updateAt DESC')
    return stmt.all(status) as CdkEntity[]
  }

  close(): void {
    this.db.close()
  }
}

export const dbManager = new DatabaseManager()
