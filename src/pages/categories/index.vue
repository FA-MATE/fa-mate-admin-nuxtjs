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

const queryString = mapToQueryString(camelToSnakeCase(route.query))
const { data } = useFetch('/api/categories?' + queryString)
const id = parseInt(route.query.id as string)
</script>
