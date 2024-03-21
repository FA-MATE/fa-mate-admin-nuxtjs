import { defineStore } from 'pinia'
import type { UserType } from '~/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<UserType[]>([])

  async function getUsers(queryString?: string): Promise<void> {
    const newUsers = (await $fetch('/api/users?' + queryString)) as UserType[]

    users.value = newUsers
  }

  async function userUser(user: UserType): Promise<UserType> {
    const newUser = (await $fetch('/api/users', {
      method: 'POST',
      body: { user },
    })) as UserType

    await getUsers()

    return newUser
  }

  async function putUser(user: UserType): Promise<void> {
    await $fetch('/api/users/' + user.id, {
      method: 'PUT',
      body: { user },
    })

    await getUsers()
  }

  async function deleteUser(user: UserType): Promise<void> {
    await $fetch('/api/users/' + user.id, {
      method: 'DELETE',
    })

    await getUsers()
  }

  return { users, getUsers, userUser, putUser, deleteUser }
})
