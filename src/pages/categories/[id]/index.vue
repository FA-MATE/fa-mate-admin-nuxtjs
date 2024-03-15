<template>
  <div>
    <CategoryForm v-model="category" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const { categoriesStore } = useCategoriesStore()
const initCategory: CategoryType = {
  name: '',
  orderNo: 0,
  subCategories: [],
}
const category = computed(
  () => categoriesStore.categories.find((category: CategoryType) => category.id.toString() == id) || initCategory
)
</script>
