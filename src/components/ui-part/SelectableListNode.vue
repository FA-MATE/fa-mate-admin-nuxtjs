<template>
  <div class="flex leading-8 border border-t-0">
    <div class="w-8 border-r">
      <input type="checkbox" class="w-4 h-4 border-0 ring-0" :checked="checked" @change="onCheckChanged" />
    </div>
    <div class="pl-2">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { item } = defineProps<{
  checked: boolean
  label: string
  item: any
}>()

const emits = defineEmits<{
  checkChanged: [e: Event, item: any]
}>()

function onCheckChanged(e: Event): void {
  emits('checkChanged', e, item)
}
</script>
