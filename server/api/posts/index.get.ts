import { snakeToCamelCase, mapToQueryString } from '~/utils/'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const query = getQuery(event)
  
  return snakeToCamelCase(await $fetch(config.apiBase + '/admin/posts?' + mapToQueryString(query)))
})