<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from '~/stores/category';
  import { useTagsStore } from '~/stores/tag';
  
  const categoriesStore = useCategoriesStore()
  await useAsyncData(() => categoriesStore.getCategories())

  const tagsStore = useTagsStore()
  await useAsyncData(() => tagsStore.getTagGroups())
</script>
