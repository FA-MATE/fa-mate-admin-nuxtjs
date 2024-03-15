<template>
  <div class="flex">
    <CategoryList :categories="data" class="mx-auto">
      <CategoryListFilter :id="id"/>
    </CategoryList>
  </div>
</template>

<script setup lang="ts">
  import { mapToQueryString, camelToSnakeCase } from '~/utils'

  const route = useRoute();

  const queryString = mapToQueryString(camelToSnakeCase(route.query))
  const { data } = useFetch('/api/categories?' + queryString)
  const { id } = route.query
</script>
