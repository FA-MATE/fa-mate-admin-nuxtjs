<template>
  <div
    class="center relative select-none whitespace-nowrap border rounded-lg py-1 px-1 align-baseline font-sans text-xs uppercase leading-none mr-1 bg-gray-100 h-6"
    data-dismissible="chip"
  >
    <div class="ml-4 mr-1 mt-px">{{ label }}</div>
    <div class="absolute top-0 left-0 mt-[0.5px] rounded-md" data-dismissible-target="chip">
      <div role="button" class="w-5 p-1" @click="dismiss">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  item: any
}>()

const emits = defineEmits<{
  dismiss: [item: any]
}>()

function dismiss(): void {
  emits('dismiss', props.item)
}
</script>
