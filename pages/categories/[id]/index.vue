<script setup lang="ts">
import type { CategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category';

const route = useRoute();
const id = route.params.id;

const { categoriesStore } = useCategoriesStore()
const initCategory: CategoryType = {
  name: '',
  orderNo: 0,
}
const category = computed(() => 
  categoriesStore.categories.find((category: CategoryType) => category.id == id) || initCategory
)
console.log("category ", category)
</script>

<template>
  <div>
    <CategoryForm :category="category" />
  </div>
</template>
