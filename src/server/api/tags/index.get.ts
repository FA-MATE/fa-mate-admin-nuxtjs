import { snakeToCamelCase } from '~/utils/'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return snakeToCamelCase(await $fetch(config.apiBase + '/admin/tags'))
})
