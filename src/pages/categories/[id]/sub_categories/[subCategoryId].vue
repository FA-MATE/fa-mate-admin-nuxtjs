<script setup lang="ts">
import type { CategoryType, SubCategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category'

const route = useRoute()
const id = route.params.subCategoryId
const categoryId = route.params.id

const {
  categoriesStore: { categories },
} = useCategoriesStore()
const category = categories.find((category: CategoryType) => category.id == categoryId)

const initSubCategory: SubCategoryType = {
  categoryId,
  name: '',
  orderNo: '0',
}
const subCategory = computed(
  () => category?.subCategories?.find((subCategory: SubCategoryType) => subCategory.id == id) || initSubCategory
)
</script>

<template>
  <SubCategoryForm v-model="subCategory" />
</template>
