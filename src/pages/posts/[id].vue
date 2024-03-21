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

const { posts } = usePostsStore()
const initPost: PostType = {
  title: '',
  body: '',
  categoryId: 0,
  subCategoryId: 0,
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
const post = posts.find((post: PostType) => post.id == id) || initPost
</script>
