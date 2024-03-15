<template>
  <CategoryFinderComponent class="z-20" label="カテゴリ" />
  <Button color="green" label="検索" @click="filterCategories" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
import { useCategoriesStore } from '~/stores/category'
import Button from '~/components/ui-part/form/Button.vue'

const router = useRouter()

const { id } = defineProps<{ id?: string }>()

const categoriesStore = useCategoriesStore()

const selectedItem = shallowRef(categoriesStore.categoriesStore.categories.find((category) => category.id == id) || {})

const CategoryFinderComponent = useSingleSelectableTextInput(
  categoriesStore.categoriesStore.categories,
  'name',
  selectedItem
)

function filterCategories(): void {
  const queryStrings = {}
  if (selectedItem.value.id != undefined && selectedItem.value.id != null) queryStrings['id'] = selectedItem.value.id

  router
    .push({
      path: '/categories',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
