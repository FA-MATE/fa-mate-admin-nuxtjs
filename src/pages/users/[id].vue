<template>
  <div>
    <UserForm v-model="user" />
  </div>
</template>

<script setup lang="ts">
import type { UserType } from '~/types'
import { useUsersStore } from '~/stores/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const { usersStore } = useUsersStore()
const initUser: UserType = {
  nickname: '',
  profileImageUrl: '',
  conditions: [],
  posts: [],
}
const user = usersStore.users.find((user: UserType) => user.id?.toString() == id) || initUser
</script>
