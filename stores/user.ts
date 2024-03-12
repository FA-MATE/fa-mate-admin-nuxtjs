import { ref } from 'vue'
import { defineStore } from "pinia";
import type { UserType } from "~/types";

export const useUsersStore = defineStore('users', () => {
  const usersStore = reactive({ users: [] as UserType[] })

  async function getUsers(queryString?: '') {
    const newUsers = (await $fetch('/api/users?' + queryString)) as UserType[];

    usersStore.users = newUsers;
  }

  async function userUser(user: UserType) {
    const newUser = await $fetch('/api/users',
      { 
        method: 'POST',
        body: { user },
      }
    ) as UserType;

    await getUsers()

    return newUser
  }

  async function putUser(user: UserType) {
    await $fetch('/api/users/' + user.id,
      { 
        method: 'PUT',
        body: { user },
      }
    )

    await getUsers()
  }

  async function deleteUser(user: UserType) {
    const userId = user.id
    await $fetch('/api/users/' + user.id,
      { 
        method: 'DELETE',
      }
    )

    await getUsers()
  }

  return { usersStore, getUsers, userUser, putUser, deleteUser }
});
