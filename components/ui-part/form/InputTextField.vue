<template>
  <label>
    <span class="text-gray-700">{{ label }}</span>      
    <input
      :type="type"
      :class="'mt-1 block w-full p-1 rounded-md border focus:border-gray-500 focus:bg-white focus:ring-0 ' + (readonly ? 'bg-gray-100' : 'bg-white')"
      :placeholder="label"
      v-model="model"
      :readonly="readonly" />
  </label>
</template>

<script setup lang="ts">
  const model = defineModel()

  withDefaults(defineProps<{label: string, type: string, readonly?: boolean}>(),{ readonly: false });
</script>