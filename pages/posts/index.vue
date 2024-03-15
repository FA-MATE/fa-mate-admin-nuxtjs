<template>
  <div class="flex">
    <PostList :posts="data" class="mx-auto">
      <PostListFilter :categoryId="categoryId" :subCategoryId="subCategoryId" />
    </PostList>
  </div>
</template>

<script setup lang="ts">
  import { mapToQueryString, camelToSnakeCase } from '~/utils'

  const route = useRoute();

  const queryString = mapToQueryString(camelToSnakeCase(route.query))
  const { data } = useFetch('/api/posts?' + queryString)
  const { categoryId, subCategoryId } = route.query
</script>
