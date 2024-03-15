<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '~/stores/category'
import { useTagsStore } from '~/stores/tag'
import { useConditionsStore } from '~/stores/condition'

const categoriesStore = useCategoriesStore()
await useAsyncData(() => categoriesStore.getCategories())

const conditionsStore = useConditionsStore()
await useAsyncData(() => conditionsStore.getConditionGroups())

const tagsStore = useTagsStore()
await useAsyncData(() => tagsStore.getTagGroups())

const usersStore = useUsersStore()
await useAsyncData(() => usersStore.getUsers())
</script>
