<script setup lang="ts">
import type { CdkEntity } from './types/cdk'
import { get } from 'lodash-es'

// const fakeKeys = `Origin Sin, 1AB2C-D3FGH-456I7-JK8LM-P1111
// Genshin Impact: Fire, 1AB2C-D3FGH-456I7-JK8LM-P2222
// Call of duty:1AB2C-D3FGH-456I7-JK8LM-P3333
// Call of duty: World War :1AB2C-D3FGH-456I7-JK8LM-P4444
// Baludur Gate：1AB2C-D3FGH-456I7-JK8LM-P5555`

const fakeKeys = `West of Dead, 4JGKG-BGFNL-GEWDV 4BBS9-QMPFN-I5JM6 1AB2C-D3FGH-456I7-JK8LM-P2222
Tooth and Tail:，4WXM7-3PJ82-5YD8E C3DTC-8FMBL-FQV0Q
SYSTEM SHOCK: ENHANCED EDITION 4QJXV-ACN8F-27BAJ 4G7FZ-QX6GJ-2W2KW
Dear Esther: Landmark Edition：4EEQB-7GM99-P2DA9 3ZN0R-DA2MG-VGR2Y`

function extractGameAndCdk(line: string) {
  const cdkRegex = /((?!\D{12}|[^A-z]{12})([A-z0-9]{4,5}-?[A-z0-9]{4,5}-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5}(-?[A-z0-9]{4,5})?)?))/g
  const cdkArr = line.match(cdkRegex) || []
  let name = line.replaceAll(cdkRegex, '').trim()
  // 名字末尾如果是分隔符则去除
  if (/[:：,，.。]$/.test(name)) {
    name = name.slice(0, -1)
  }
  return cdkArr.map(cdk => ({ name, cdk }))
}

function initCdkItem(name: string, cdk: string): CdkEntity {
  return {
    id: crypto.randomUUID(),
    name,
    cdk,
    status: 'isUnused',
    remark: '',
    deleteFlag: false,
    createAt: Date.now(),
    updateAt: Date.now(),
  }
}

function handleFormat() {
  const lines = fakeKeys.split('\n')
  for (const line of lines) {
    if (line.trim()) {
      const gameCdkPairs = extractGameAndCdk(line)
      gameCdkPairs.forEach(({ name, cdk }) => {
        const cdkInstance = initCdkItem(name, cdk)
        console.log(cdkInstance)
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="whitespace-pre-wrap">
      {{ fakeKeys }}
    </div>
    <input type="text">
    <button class="btn" @click="handleFormat">
      format
    </button>
    <h1 class="relative border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700" role="alert">
      Hello Vue!
    </h1>
  </div>
</template>
