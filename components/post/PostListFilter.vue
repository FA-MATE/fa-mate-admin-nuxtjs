<template>
  <CategoryFinderComponent class="z-20" label="カテゴリ" />
  <SubCategoryFinderComponent class="z-10" label="サブカテゴリ" />
</template>

<script setup lang="ts">
  import { useMultiSelectableTextInput } from '~/composable/useMultiSelectableTextInput'
  import { useCategoriesStore } from '~/stores/category';
  import type { CategoryType } from '~/types'

  const categoriesStore = useCategoriesStore()
  const subCategories = categoriesStore.categoriesStore.categories.map((category: CategoryType) => category.subCategories ).flat()
  const [selectedCategories, CategoryFinderComponent] = useMultiSelectableTextInput(categoriesStore.categoriesStore.categories, 'name')
  const [selectedSubCategories, SubCategoryFinderComponent] = useMultiSelectableTextInput(subCategories, 'name')
</script>
