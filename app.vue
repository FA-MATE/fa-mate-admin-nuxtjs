<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from '~/stores/category';
  
  const categoriesStore = useCategoriesStore()
  await useAsyncData(() => categoriesStore.getCategories())
</script>
