<script setup lang="ts">
import { useCategoriesStore } from '~/stores/category';

const categoriesStore = useCategoriesStore()
await useAsyncData(() => categoriesStore.getCategories())
</script>

<template>
  <Header />
  <div class="flex">
    <CategoryList :categories="categoriesStore.categoriesStore.categories" />
    <slot />
  </div>
</template>