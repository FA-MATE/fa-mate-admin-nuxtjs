<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent v-model="selectedCategoryIds" class="z-20" label="カテゴリ" />
    <div class="flex justify-end pt-2">
      <Button color="green" label="検索" @click="filterCategories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '~/stores/category'
import { createQueryStrings } from '~/utils'
import Button from '~/components/ui-part/form/Button.vue'
import { useSelectableTextInput } from '~/composable/useSelectableTextInput'

const props = defineProps<{ ids?: string[] }>()

const categoriesStore = useCategoriesStore()
const selectedCategoryIds = ref(props.ids || [])
const CategoryFinderComponent = useSelectableTextInput(categoriesStore.categories, 'name')

const router = useRouter()

function filterCategories(): void {
  const queryStrings = createQueryStrings(selectedCategoryIds.value, 'id')

  router
    .push({
      path: '/categories',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
