import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const post = {
      name: body.post.name,
      orderNo: body.post.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/posts', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ post }))
  })

  return snakeToCamelCase(response);
});