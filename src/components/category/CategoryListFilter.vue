<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent class="z-20" label="カテゴリ" />
    <div class="flex justify-end pt-2">
      <Button color="green" label="検索" @click="filterCategories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '~/stores/category'
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
import Button from '~/components/ui-part/form/Button.vue'

const props = defineProps<{ id?: number; subCategoryIds?: number }>()

const categoriesStore = useCategoriesStore()
const selectedItem = ref(categoriesStore.categoriesStore.categories.find((category) => category.id == props.id))
const CategoryFinderComponent = useSingleSelectableTextInput(
  categoriesStore.categoriesStore.categories,
  'name',
  selectedItem
)

const router = useRouter()
type queryStringType = { id?: number }

function filterCategories(): void {
  const queryStrings: queryStringType = {}
  if (selectedItem.value != undefined) queryStrings.id = selectedItem.value.id

  router
    .push({
      path: '/categories',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
