import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const post = await readBody(event)

  const response = await $fetch(config.apiBase + '/admin/posts', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ post })),
  })

  return snakeToCamelCase(response)
})
