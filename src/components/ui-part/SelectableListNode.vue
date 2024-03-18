<template>
  <div class="flex leading-8 border border-t-0">
    <div class="w-8 border-r">
      <input type="checkbox" class="w-4 h-4 border-0 ring-0" :checked="selected" @change="change" />
    </div>
    <div class="pl-2">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selected: boolean
  label: string
  item: any
}>()

const emits = defineEmits<{
  change: [e: Event, item: any]
}>()

function change(e: Event): void {
  emits('change', e, props.item)
}
</script>
