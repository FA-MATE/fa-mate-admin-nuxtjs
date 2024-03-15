<template>
  <div class="flex">
    <UserList :users="usersStore.usersStore.users" class="mx-auto"> </UserList>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/user'
import { mapToQueryString, camelToSnakeCase } from '~/utils'
import { useRoute } from 'vue-router'

const route = useRoute()

const usersStore = useUsersStore()

const queryString = mapToQueryString(camelToSnakeCase(route.query))

usersStore.getUsers(queryString)
</script>
