<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent v-model="selectedCategoryId" class="z-20" label="カテゴリ" />
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

const props = defineProps<{ id?: number }>()

const categoriesStore = useCategoriesStore()
const selectedCategoryId = ref(props.id)
const CategoryFinderComponent = useSelectableTextInput<number>(categoriesStore.categories, 'name')

const router = useRouter()

function filterCategories(): void {
  const queryStrings = createQueryStrings({
    id: selectedCategoryId.value,
  })

  router
    .push({
      path: '/categories',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
