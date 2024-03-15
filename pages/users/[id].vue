<template>
  <div>
    <UserForm :user="user" />
  </div>
</template>

<script setup lang="ts">
  import type { UserType, ConditionType, PostType } from '~/types'
  import { useUsersStore } from '~/stores/user';

  const route = useRoute();
  const id = route.params.id;

  const { usersStore } = useUsersStore()
  const initUser: UserType = {
    nickname: '',
    profile_image_url: '',
    conditions: [],
    posts: [],
  }
  const user = computed(() => 
    usersStore.users.find((user: UserType) => user.id == id) || initUser
  )
</script>