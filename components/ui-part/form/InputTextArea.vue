<template>
  <label>
    <span class="text-gray-700">{{ label }}</span>   
    <textarea
      class="mt-1 block w-full rounded-md bg-white border focus:border-gray-500 focus:bg-white focus:ring-0"
      rows="6"
      v-model="model"></textarea>
  </label>
</template>

<script setup lang="ts">
  const model = defineModel()

  withDefaults(defineProps<{label: string, type: string, readonly?: boolean}>(),{ readonly: false });
</script>