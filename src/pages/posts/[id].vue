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

const { postsStore } = usePostsStore()
const initPost: PostType = {
  title: '',
  body: '',
  categoryId: '0',
  subCategoryId: '0',
  user: {
    nickname: 'test',
    profileImageUrl: '',
    conditions: [],
    posts: [],
  },
  tags: [],
  conditions: [],
  postImages: [],
  createdAt: '',
  updatedAt: '',
}
const post = postsStore.posts.find((post: PostType) => post.id == id) || initPost
</script>
