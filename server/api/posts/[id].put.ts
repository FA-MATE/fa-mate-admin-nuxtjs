import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const post = body.post
  const response = await $fetch(config.apiBase + '/admin/posts/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ post }))
  })

  return snakeToCamelCase(response);
});