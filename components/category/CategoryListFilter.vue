<template>
  <CategoryFinderComponent class="z-20" label="カテゴリ"/>
  <Button color="green" label="検索" @click="filterCategories"/>
</template>

<script setup lang="ts">
  import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
  import { useCategoriesStore } from '~/stores/category';
  import Button from '~/components/ui-part/form/Button'

  const { id } = defineProps<{id?: string}>()

  const categoriesStore = useCategoriesStore()

  const selectedItem = shallowRef(categoriesStore.categoriesStore.categories.find((category) => category.id == id) || {});

  const CategoryFinderComponent = useSingleSelectableTextInput(categoriesStore.categoriesStore.categories, 'name', selectedItem)

  async function filterCategories() {
    const queryStrings = []
    if(selectedItem.value.id != undefined && selectedItem.value.id != null) queryStrings.push("id=" + selectedItem.value.id)

    reloadNuxtApp ({ 
      path : "/categories?" + queryStrings.join("&"), 
      ttl : 1000,
    }); 
  }
</script>
