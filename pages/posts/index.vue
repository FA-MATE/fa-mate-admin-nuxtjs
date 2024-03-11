<template>
  <div class="flex">
    <PostList :posts="postsStore.postsStore.posts" class="mx-auto">
      <PostListFilter />
    </PostList>
  </div>
</template>

<script setup lang="ts">
  import { usePostsStore } from '~/stores/post';
  import type { PostType } from '~/types'
  import { mapToQueryString, camelToSnakeCase } from '~/utils'

  const postsStore = usePostsStore()
  const route = useRoute();

  const queryString = mapToQueryString(camelToSnakeCase(route.query))

  await useAsyncData(() => postsStore.getPosts(queryString))
</script>
