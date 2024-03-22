<template>
  <div class="flex">
    <CategoryList :categories="data || []" class="mx-auto">
      <CategoryListFilter :id="id" />
    </CategoryList>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mapToQueryString, camelToSnakeCase } from '~/utils'

const route = useRoute()
let id = route.query.id

const queryString = mapToQueryString(camelToSnakeCase(route.query))
const { data } = useFetch('/api/categories?' + queryString)
</script>
