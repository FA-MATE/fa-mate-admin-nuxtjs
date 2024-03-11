import { snakeToCamelCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  return snakeToCamelCase(await $fetch('https://fa-mate-admin-nuxtjs.onrender.com/admin/categories'))
})