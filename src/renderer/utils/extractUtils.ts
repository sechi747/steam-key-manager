import type { CdkEntity } from '@renderer/types/cdk'

export function extractGameAndCdk(line: string) {
  // 处理如下格式  游戏名：Silver Chains ,Key: 8T34G-5ZNBI-ZETVC
  const regex = /游戏名：([^,]+),Key: ([A-z0-9-]+)/
  const match = line.match(regex)

  if (match) {
    const name = match[1].trim()
    const cdk = match[2].trim()
    return [{ name, cdk }]
  }

  const cdkRegex = /((?!\D{12}|[^A-z]{12})([A-z0-9]{4,5}-?[A-z0-9]{4,5}-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5})?)?))/g
  const cdkArr = line.match(cdkRegex) || []
  let name = line.replaceAll(cdkRegex, '').trim()
  // 名字末尾如果是分隔符则去除
  while (/[:：,，.。]$/.test(name)) {
    name = name.slice(0, -1)
  }
  return cdkArr.map(cdk => ({ name, cdk }))
}

export function initCdkItem(name: string, cdk: string): CdkEntity {
  return {
    id: crypto.randomUUID(),
    name,
    cdk,
    status: 'isUnused',
    remark: '',
    createAt: Date.now(),
    updateAt: Date.now(),
  }
}

// 从多行文本中提取所有的游戏名和 CDKey 并返回 CdkEntity 实例数组
export function processInputLines(lines: string[]) {
  const cdkInstances: CdkEntity[] = []
  for (const line of lines) {
    if (line.trim()) {
      const gameCdkPairs = extractGameAndCdk(line)
      gameCdkPairs.forEach(({ name, cdk }) => {
        const cdkInstance = initCdkItem(name, cdk)
        cdkInstances.push(cdkInstance)
      })
    }
  }
  return cdkInstances
}
