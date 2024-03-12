import { snakeToCamelCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  return snakeToCamelCase(await $fetch(config.apiBase + '/admin/categories'))
})