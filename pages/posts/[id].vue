<script setup lang="ts">
import type { PostType } from '~/types'
import { usePostsStore } from '~/stores/post';


const route = useRoute();
const id = route.params.id;

const { postsStore } = usePostsStore()
const initPost: PostType = {
  title: '',
  categoryId: 0,
  subCategoryId: 0,
  user: {
    nickname: 'test'
  },
  tags: [],
  conditions: [],
  postImages: []
}
const post = computed(() => 
  postsStore.posts.find((post: PostType) => post.id == id) || initPost
)
</script>

<template>
  <div>
    <PostForm :post="post" />
  </div>
</template>
