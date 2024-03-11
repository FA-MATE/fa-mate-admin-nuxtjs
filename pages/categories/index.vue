<template>
  <div class="flex">
    <CategoryList :categories="categoriesStore.categoriesStore.categories" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';

  const categoriesStore = useCategoriesStore()
</script>
