<template>
  <div>
    <PostForm v-model="post" />
  </div>
</template>

<script setup lang="ts">
import type { PostType } from '~/types'
import { usePostsStore } from '~/stores/post'

const route = useRoute()
const id = route.params.id

const postsStore = usePostsStore()

const post =
  id !== 'new' && postsStore.posts.length == 0
    ? await postsStore.getPost(id)
    : postsStore.posts.find((post: PostType) => post.id?.toString() == id)
</script>
