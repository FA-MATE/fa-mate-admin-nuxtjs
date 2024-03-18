<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent class="z-20" label="カテゴリ" />
    <SubCategoryFinderComponent class="z-10" label="サブカテゴリ" />
    <div class="flex justify-end pt-2">
      <Button color="green" label="検索" @click="filterPosts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
import { useCategoriesStore } from '~/stores/category'
import type { CategoryType } from '~/types'
import Button from '~/components/ui-part/form/Button.vue'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  categoryId?: string
  subCategoryId?: string
}>()

const categoriesStore = useCategoriesStore()
const categories = categoriesStore.categoriesStore.categories
const subCategories = categories.map((category: CategoryType) => category.subCategories).flat()

const selectedCategory = shallowRef(categories.find((category) => category.id == props.categoryId))
const selectedSubCategory = shallowRef(subCategories.find((subCategory) => subCategory.id == props.subCategoryId))

const CategoryFinderComponent = useSingleSelectableTextInput(
  categoriesStore.categoriesStore.categories,
  'name',
  selectedCategory
)
const SubCategoryFinderComponent = useSingleSelectableTextInput(subCategories, 'name', selectedSubCategory)

const router = useRouter()
type queryStringType = { categoryId?: number; subCategoryId?: number }
async function filterPosts(): Promise<void> {
  const queryStrings: queryStringType = {}
  if (selectedCategory.value != undefined) queryStrings.categoryId = selectedCategory.value.id
  if (selectedSubCategory.value != undefined) queryStrings.subCategoryId = selectedSubCategory.value.id

  router
    .push({
      path: '/posts',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
