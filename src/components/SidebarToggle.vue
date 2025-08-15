<template>
  <div class="inline-flex items-center gap-2">
    <select
      v-model="selected"
      class="rounded-lg border px-3 py-1 text-sm"
      title="Theme"
    >
      <option value="light">Light 🌞</option>
      <option value="dark">Dark 🌙</option>
      <option value="system">System 🖥️</option>
    </select>
    <span class="text-xs opacity-70">
      {{ resolved === 'dark' ? 'using Dark' : 'using Light' }}
      <span v-if="selected === 'system'">(system)</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore, type ThemeMode } from '@/stores/ui'

const ui = useUiStore()
const { theme } = storeToRefs(ui)

// 下拉选值 = store 里的三态
const selected = computed<ThemeMode>({
  get: () => theme.value,
  set: (m) => ui.setTheme(m)
})

// 根据三态计算实际应该应用到 DOM 的模式（light/dark）
function prefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
const resolved = computed<'light' | 'dark'>(() =>
  selected.value === 'dark'
    ? 'dark'
    : selected.value === 'light'
      ? 'light'
      : prefersDark()
        ? 'dark'
        : 'light'
)

function applyTheme() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', resolved.value === 'dark') // UnoCSS 默认 dark='class'
  root.dataset.theme = resolved.value
}

let mql: MediaQueryList | null = null
function addSystemListener() {
  if (typeof window === 'undefined' || !window.matchMedia) return
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  mql.addEventListener?.('change', handleSystemChange)
}
function removeSystemListener() {
  mql?.removeEventListener?.('change', handleSystemChange)
  mql = null
}
function handleSystemChange() {
  // 只有在 system 模式时才需要重新应用
  if (selected.value === 'system') applyTheme()
}

onMounted(() => {
  applyTheme()
  if (selected.value === 'system') addSystemListener()
})

onBeforeUnmount(() => removeSystemListener())

watch(selected, (m) => {
  applyTheme()
  // 切换到 system 才监听，离开就移除
  if (m === 'system') addSystemListener()
  else removeSystemListener()
})

watch(resolved, () => applyTheme())
</script>
