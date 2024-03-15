<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/categories/' + category.id">{{ category.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/posts?categoryId=' + category.id ">
        <Button label="関連投稿" color="orange" />
      </NuxtLink>
      <Button label="削除" color="red" @click="handleDeleteCategory" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';
  import Button from '~/components/ui-part/form/Button'

  const { category } = defineProps<{category: CategoryType}>();
  const { deleteCategory } = useCategoriesStore()

  async function handleDeleteCategory() {
    if(!confirm('削除しますか？')) return

    await deleteCategory(category)

    navigateTo({ path: '/categories' });
  }
</script>