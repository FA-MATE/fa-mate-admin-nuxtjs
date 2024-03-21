<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent v-model="selectedCategoryIds" class="z-20" label="カテゴリ" />
    <div class="flex justify-end pt-2">
      <Button color="green" label="検索" @click="filterCategories(selectedCategoryIds[0])" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '~/stores/category'
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
import Button from '~/components/ui-part/form/Button.vue'
import { createQueryStrings } from '~/utils'

const props = defineProps<{ id?: number; subCategoryIds?: number }>()

const categoriesStore = useCategoriesStore()
const selectedCategoryIds = ref(props.id ? [props.id] : [])
const CategoryFinderComponent = useSingleSelectableTextInput(categoriesStore.categoriesStore.categories, 'name')

const router = useRouter()

function filterCategories(selectedCategoryId: number | null): void {
  const queryStrings = createQueryStrings(selectedCategoryId, 'id')

  router
    .push({
      path: '/categories',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
