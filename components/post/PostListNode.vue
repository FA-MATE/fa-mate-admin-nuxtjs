<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/posts/' + post.id">{{ post.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.title }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.categoryId }} > {{ post.subCategoryId }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.user.nickname }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <Button label="削除" color="red" :onClick="handleDeletePost" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { PostType } from '~/types'
  import { usePostsStore } from '~/stores/post';
  import Button from '~/components/ui-part/form/Button'

  const { deletePost } = usePostsStore()

  const { post } = defineProps<{post: PostType}>();

  async function handleDeletePost() {
    if(!confirm('削除しますか？')) return

    await deletePost(post)

    navigateTo({ path: '/posts' });
  }
</script>
