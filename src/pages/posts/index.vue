<template>
  <div class="flex overflow-x-scroll">
    <PostList :posts="postsStore.posts || []" class="mx-auto">
      <PostListFilter
        :category-id="categoryId"
        :sub-category-id="subCategoryId"
        :tag-id="tagId"
        :condition-id="conditionId"
        :user-id="userId"
      />
    </PostList>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/post'
import { mapToQueryString, camelToSnakeCase } from '~/utils'

const route = useRoute()

const queryString = mapToQueryString(camelToSnakeCase(route.query))

const postsStore = usePostsStore()
await useAsyncData(() => postsStore.getPosts(queryString))
let { categoryId, subCategoryId, tagId, conditionId, userId } = route.query
</script>
