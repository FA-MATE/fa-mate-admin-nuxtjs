import { snakeToCamelCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  return snakeToCamelCase(await $fetch('https://fa-mate-rails.onrender.com/admin/categories'))
})