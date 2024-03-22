<template>
  <div class="flex overflow-x-scroll">
    <PostList :posts="data || []" class="mx-auto">
      <PostListFilter
        :category-ids="categoryIds"
        :sub-category-ids="subCategoryIds"
        :tag-ids="tagIds"
        :condition-ids="conditionIds"
        :user-ids="userIds"
      />
    </PostList>
  </div>
</template>

<script setup lang="ts">
import { mapToQueryString, camelToSnakeCase } from '~/utils'

const route = useRoute()

const queryString = mapToQueryString(camelToSnakeCase(route.query))
const { data } = useFetch('/api/posts?' + queryString)
let categoryIds = [route.query.categoryId || []].flat()
let subCategoryIds = [route.query.subCategoryId || []].flat()
let tagIds = [route.query.tagId || []].flat()
let conditionIds = [route.query.conditionId || []].flat()
let userIds = [route.query.userId || []].flat()
</script>
