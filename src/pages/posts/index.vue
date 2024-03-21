<template>
  <div class="flex overflow-x-scroll">
    <PostList :posts="data || []" class="mx-auto">
      <PostListFilter
        :category-id="categoryId"
        :sub-category-id="subCategoryId"
        :tag-ids="tagIds?.split(',')"
        :condition-ids="conditionIds?.split(',')"
        :user-id="userId"
      />
    </PostList>
  </div>
</template>

<script setup lang="ts">
import { mapToQueryString, camelToSnakeCase } from '~/utils'

const route = useRoute()

const queryString = mapToQueryString(camelToSnakeCase(route.query))
const { data } = useFetch('/api/posts?' + queryString)
const { categoryId, subCategoryId, tagIds, conditionIds, userId } = route.query
</script>
