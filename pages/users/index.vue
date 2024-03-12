<template>
  <div class="flex">
    <UserList :users="usersStore.usersStore.users" class="mx-auto">
    </UserList>
  </div>
</template>

<script setup lang="ts">
  import { useUsersStore } from '~/stores/user';
  import type { UserType } from '~/types'
  import { mapToQueryString, camelToSnakeCase } from '~/utils'

  const usersStore = useUsersStore()
  const route = useRoute();

  const queryString = mapToQueryString(camelToSnakeCase(route.query))

  await useAsyncData(() => usersStore.getUsers(queryString))
</script>
