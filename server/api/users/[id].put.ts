import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const user = body.user
  const response = await $fetch(config.apiBase + '/admin/users/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ user }))
  })

  return snakeToCamelCase(response);
});