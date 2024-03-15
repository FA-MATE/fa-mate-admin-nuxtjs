<template>
  <button
    :class="colorClasses(color)" 
    @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  defineProps<{label: string, color: string}>();

  const emits = defineEmits<{
    (event?: 'click'): void
  }>()

  function onClick(){
    emits('click')
  }

  const colorClasses = (name: string) => {
    return {
      'green': 'center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
      'red': 'center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
      'orange': 'center rounded-lg py-1 px-3 mr-1 font-sans text-xs font-bold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
    }[name]
  }
</script>