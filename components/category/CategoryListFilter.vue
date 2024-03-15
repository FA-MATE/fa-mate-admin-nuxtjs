<template>
  <CategoryFinderComponent class="z-20" label="カテゴリ"/>
  <Button color="green" label="検索" :onClick="filterCategories"/>
</template>

<script setup lang="ts">
  import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
  import { useCategoriesStore } from '~/stores/category';
  import Button from '~/components/ui-part/form/Button'

  const { id } = defineProps<{id?: string}>()

  const categoriesStore = useCategoriesStore()

  const selectedItem = shallowRef(categoriesStore.categoriesStore.categories.find((category) => category.id == id) || {});

  const CategoryFinderComponent = useSingleSelectableTextInput(categoriesStore.categoriesStore.categories, 'name', selectedItem)

  const queryStrings = []
  if(id != undefined && id != null) queryStrings.push("id=" + id)

  async function filterCategories() {
    reloadNuxtApp ({ 
      path : "/categories?" + queryStrings.join("&"), 
      ttl : 1000,
    }); 
  }
</script>
