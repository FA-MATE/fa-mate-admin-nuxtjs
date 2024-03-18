<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/categories/' + category.id">{{ category.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ category.name }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ category.orderNo }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/posts?categoryId=' + category.id">
        <Button label="関連投稿" color="orange" />
      </NuxtLink>
      <Button label="削除" color="red" @click="handleDeleteCategory" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { CategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category'
import Button from '~/components/ui-part/form/Button.vue'

const props = defineProps<{ category: CategoryType }>()
const { deleteCategory } = useCategoriesStore()
const router = useRouter()

function handleDeleteCategory(): void {
  if (!confirm('削除しますか？')) return

  deleteCategory(props.category).then(() => {
    router.push({ path: '/categories' }).then(() => router.go(0))
  })
}
</script>
