export interface CdkEntity {
  id: string
  name: string
  cdk: string
  status: CdkStatus
  remark: string
  // region: string
  // purchasePrice: number | null // 若来自慈善包则为 null，单独购买则为具体价格
  // isFromPackage: boolean // 是否来自慈善包
  // packageId: string | null // 关联的慈善包 ID
  // tag: string[]
  // deleteFlag: boolean
  // statusHistory: StatusHistoryItem[]
  createAt: number
  updateAt: number
}

// 慈善包实体
export interface PackageEntity {
  id: string
  name: string
  totalPrice: number
  cdkIds: string[]
  purchaseDate: number
}

export type CdkStatus = 'isUnused' | 'isUsed' | 'isPending'

export interface StatusHistoryItem {
  status: CdkStatus
  changeAt: number
  reason: string
}
