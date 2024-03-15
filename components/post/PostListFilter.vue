<template>
  <CategoryFinderComponent class="z-20" label="カテゴリ" />
  <SubCategoryFinderComponent class="z-10" label="サブカテゴリ" />
  <Button color="green" label="検索" @click="filterPosts"/>
</template>

<script setup lang="ts">
  import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
  import { useCategoriesStore } from '~/stores/category';
  import type { CategoryType } from '~/types'
  import Button from '~/components/ui-part/form/Button'

  const { categoryId, subCategoryId } = defineProps<{categoryId?: string, subCategoryId?: string,}>()

  const categoriesStore = useCategoriesStore()
  const categories = categoriesStore.categoriesStore.categories
  const subCategories = categories.map((category: CategoryType) => category.subCategories ).flat()

  const selectedCategory = shallowRef(categories.find((category) => category.id == categoryId) || {})
  const selectedSubCategory = shallowRef(subCategories.find((subCategory) => subCategory.id == subCategoryId) || {})
  
  const CategoryFinderComponent = useSingleSelectableTextInput(categoriesStore.categoriesStore.categories, 'name', selectedCategory)
  const SubCategoryFinderComponent = useSingleSelectableTextInput(subCategories, 'name', selectedSubCategory)

  async function filterPosts() {
    const queryStrings = []
    if(selectedCategory.value.id != undefined && selectedCategory.value.id != null) queryStrings.push("categoryId=" + selectedCategory.value.id)
    if(selectedSubCategory.value.id != undefined && selectedSubCategory.value.id != null) queryStrings.push("subCategoryId=" + selectedSubCategory.value.id)

    reloadNuxtApp ({ 
      path : "/posts?" + queryStrings.join("&"), 
      ttl : 1000,
    }); 
  }
</script>
