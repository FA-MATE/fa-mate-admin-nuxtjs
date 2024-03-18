<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/users/' + user.id">{{ user.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ user.nickname }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <Button label="削除" color="red" @click="handleDeleteUser" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { UserType } from '~/types'
import { useUsersStore } from '~/stores/user'
import Button from '~/components/ui-part/form/Button.vue'

const { deleteUser } = useUsersStore()
const props = defineProps<{ user: UserType }>()

async function handleDeleteUser(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteUser(props.user).then(() => {
    navigateTo({
      path: '/users',
    })
  })
}
</script>
