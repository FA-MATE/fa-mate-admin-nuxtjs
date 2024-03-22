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
const id = parseInt(route.params.id as string)

const { categories } = useCategoriesStore()
const initCategory: CategoryType = {
  name: '',
  orderNo: 0,
  subCategories: [],
}
const category = computed(() => categories.find((category: CategoryType) => category.id == id) || initCategory)
</script>
